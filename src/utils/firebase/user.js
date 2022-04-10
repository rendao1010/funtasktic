import { reactive, ref } from "vue";
import { getUser } from "../user";
import {
  query,
  getDocs,
  collection,
  getFirestore,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../firebase";

const db = getFirestore(firebaseApp);

const defaultImage =
  "https://www.cdbradshaw.com/wp-content/uploads/2021/07/generic-avatar.jpg";

export const getUsers = async () => {
  // Create a root reference
  const storage = getStorage();
  const users = await getDocs(collection(db, "User"));
  const result = [];
  for (const doc of users.docs) {
    const data = doc.data();

    const user = reactive({
      ...data,
      ref: doc.ref,
      avatar: defaultImage,
      value: data["Full Name"],
    });

    result.push(user);

    const imageRef = storageRef(storage, data.id + ".jpg");
    getDownloadURL(imageRef)
      .then((url) => {
        user.avatar = url;
      })
      .catch(() => {
        user.avatar = defaultImage;
      });
  }

  return result;
};

export const getOutstandingTasks = async (users) => {
  const q = query(
    collection(db, "Tasks"),
    where("Members", "array-contains", doc(db, "User", getUser().refId)),
    where("Status", "!=", "Completed"),
    orderBy("Status"),
    orderBy("Due Date"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => docToTask(doc, users));
};

export const getTasks = async (users) => {
  const q = query(
    collection(db, "Tasks"),
    where("Members", "array-contains", doc(db, "User", getUser().refId)),
    orderBy("Due Date"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => docToTask(doc, users));
};

export const docToTask = (doc, users) => {
  const data = doc.data();
  const id = doc.id;
  return {
    Id: id,
    Title: data.Name,
    Description: data.Description,
    Subtitle: data["Due Date"].toDate().toLocaleDateString(),
    "Due Date": data["Due Date"].toDate(),
    Tags: data.Tags,
    Priority: data.Label,
    Status: data.Status,
    Members: data.Members.map((member) => {
      return users.find((user) => user.ref.id === member.id);
    }),
    ProjectId: data.Project.id,
    Comments: data.Comments,
  };
};
