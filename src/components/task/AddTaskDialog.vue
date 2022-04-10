<template>
  <el-form
    id="form"
    ref="form"
    :rules="rules"
    :model="model"
  >
    <el-space
      direction="vertical"
      alignment="stretch"
      :fill="true"
      :size="24"
      style="width: 100%"
    >
      <task-section id="title">
        <typography type="h2">
          Title
        </typography>
        <el-form-item prop="title">
          <el-input
            v-model="model.title"
            class="w-50 m-2"
            size="large"
            placeholder="e.g., Meeting with the team"
          />
        </el-form-item>
      </task-section>
      <el-row>
        <el-col
          :xs="24"
          :md="12"
        >
          <task-section>
            <typography type="h3">
              Priority
            </typography>
            <el-dropdown>
              <el-button
                class="el-dropdown-link"
                size="large"
              >
                <div style="display: flex; align-items: center; gap: 12px">
                  <task-priority-icon :priority="model.priority" />
                  {{ model.priority }}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </div>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(priority, index) in priorities"
                    :key="index"
                    :label="priority"
                    :value="priority"
                    @click="handlePriorityChange(priority)"
                  >
                    <div style="display: flex; align-items: center; gap: 12px">
                      <task-priority-icon :priority="priority" />
                      {{ priority }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </task-section> 
        </el-col>
        <el-col
          :xs="24"
          :md="12"
        >
          <task-section>
            <typography type="h3">
              Due date
            </typography>
            <el-form-item prop="date">
              <el-date-picker
                v-model="model.date"
                type="date"
                placeholder="Pick a day"
              />
            </el-form-item>
          </task-section>
        </el-col>
      </el-row>
      <task-section>
        <typography type="h3">
          Members
        </typography>
        <div class="avatar-row">
          <el-avatar
            v-for="member in members"
            :key="member"
            :size="36"
            :src="member.avatar"
          />
        </div>
        <user-autocomplete 
          :on-add-user="addMember"
          :search-filter="filterMembers"
        />
        <el-space wrap>
          <div
            v-for="(member, index) in model.members"
            :key="member"
          >
            <el-button
              type="primary"
              plain
              round
              @click="removeMember(index)"
            >
              {{ member["Full Name"] }}<el-icon class="el-icon--right">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </el-space>
      </task-section>
      <task-section id="tags">
        <Typography type="h3">
          Tags
        </Typography>
        <el-input
          v-model="tagInput"
          class="w-50 m-2"
          size="large"
          placeholder="Enter tag"
          @keydown.enter="addTag($event)"
          @keydown.delete="removeLastTag($event)"
        />
        <el-space wrap>
          <div
            v-for="(tag, index) in model.tags"
            :key="tag"
          >
            <el-button
              type="primary"
              plain
              round
              @click="removeTag(index)"
            >
              {{ tag }}<el-icon class="el-icon--right">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </el-space>
      </task-section>
      <task-section
        id="description"
      >
        <Typography
          type="h3"
        >
          Description
        </Typography>
        <el-input
          v-model="model.description"
          :autosize="{ minRows: 3 }"
          type="textarea"
          placeholder="e.g., Discuss the next steps for the project."
        />
      </task-section>
      <task-section v-if="props.isEditing">
        <typography type="h2">
          Comments
        </typography>
        <el-input
          v-model="commentInput"
          type="textarea"
          placeholder="Add a comment..."
        />
        <el-button
          type="primary"
          @click="addComment()"
        >
          Comment
        </el-button>
        <div style="height: 24px" />
        <el-space
          v-if="comments.length > 0"
          direction="vertical"
          alignment="stretch"
          :spacer="divider"
          :size="0"
        >
          <div
            v-for="comment in comments"
            :key="comment"
          >
            <TaskComment
              :author="comment.author"
              :content="comment.content"
              :timestamp="comment.timestamp"
            />
          </div>
        </el-space>
        <div
          v-else
        >
          <Typography type="h4">
            No comments yet.
          </Typography>
        </div>
      </task-section>
    </el-space>
  </el-form>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import Typography from '../../components/Typography.vue';
import TaskSection from "./TaskSection.vue";
import TaskComment from "../../components/task/TaskComment.vue";
import TaskPriorityIcon from "../../components/task/TaskPriorityIcon.vue";
import UserAutocomplete from "../project/UserAutocomplete.vue";
import { Close, CollectionTag } from "@element-plus/icons-vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDivider, ElNotification } from 'element-plus'

import firebaseApp from "../../firebase.js";
import { arrayUnion, collection, getFirestore, doc, setDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { getUser } from '../../utils/user';
import { getUsers } from '../../utils/firebase/user';
const db = getFirestore(firebaseApp);

const divider = h(ElDivider);

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  task: {
    type: Object,
    required: false,
    default: () => null,
  },
  isEditing: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const form = ref();
const rules = ref({
  title: [
    { required: true, message: 'Title cannot be empty' },
  ],
  date: [
    { required: true, message: 'Due date cannot be empty' },
  ],
});

const priorities = ['Urgent', 'Priority', 'Normal'];
const comments = ref(props.task.Comments ?? []);

const tagInput = ref("");
const commentInput = ref("");
const users = ref([]);

onMounted(async () => {
  users.value = await getUsers();
  users.value = users.value.filter(user => props.project.members.map(member => member.id).includes(user.ref.id));
  if (props.task) {
    comments.value = await getComments();
  }
});

// Task details
const model = ref({
  title: props.task.Title ?? "",
  description: props.task.Description ?? "",
  date: props.task["Due Date"] ?? null,
  tags: props.task.Tags ? [...props.task.Tags] : [],
  members: props.task.Members ? [...props.task.Members] : [],
  priority: props.task.Priority ?? priorities[0],
});

const addMember = (user) => {
  model.value.members.push(user);
}

const removeMember = (index) => {
  model.value.members.splice(index, 1);
};

const filterMembers = (u) => {
return !model.value.members.includes(u) && users.value.map(user => user.ref.id).includes(u.ref.id);
};

async function addTag(event) {
  event.preventDefault();
  var val = event.target.value.trim();
  if (val.length > 0) {
    model.value.tags.push(val);
    event.target.value = "";
  }
}

const getComments = async () => {
  const q = doc(db, "Tasks", props.task.Id);
  const querySnapshot = await getDoc(q);
  const comments = querySnapshot.data().Comments;

  for (const comment of comments) {
    comment.author = users.value.find(u => u.ref.id === comment.author);
  }

  // Reverse
  comments.reverse();
  return comments;
}

function removeLastTag(event) {
  if (event.target.value.length === 0) {
    this.removeTag(model.value.tags.length - 1);
  }
}

function removeTag(index) {
  model.value.tags.splice(index, 1);
}

function handlePriorityChange(priority) {
  model.value.priority = priority;
}

const addComment = async () => {
  if (commentInput.value.length > 0) {
    const comment = {
      author: getUser().refId,
      content: commentInput.value,
      timestamp: new Date(),
    };

    // Update using array union
    await updateDoc(doc(db, "Tasks", props.task.Id), {
      Comments: arrayUnion(comment),
    });
    await addDoc(collection(db, "Events"), {
      type: "taskComment",
      taskId: props.task.Id,
      projectId: props.project.id,
      author: getUser().refId,
      timestamp: new Date(),
    });

    // Clear input
    commentInput.value = "";

    // Get comments
    comments.value = await getComments();
  }
}

async function submit() {
  return await form.value.validate(async (valid, fields) => {
    if (!valid) {
      return false;
    }

    const title = model.value.title;
    const description = model.value.description;
    const date = model.value.date;
    const priority = model.value.priority;
    const tags = model.value.tags;
    const members = model.value.members;

    if (!props.isEditing) {
      await addDoc(collection(db, "Tasks"), {
        Name: title,
        Description: description,
        "Due Date": date,
        Label: priority,
        Status: "New",
        Tags: tags,
        Project: doc(db, "Project", props.project.id),
        Members: members.map((member) => member.ref),
        Comments: [],
      });
      ElNotification({
        title: 'Task created',
        message: `Task "${title}" has been created`,
      })
    } else {
      await updateDoc(doc(db, 'Tasks', props.task.Id), {
        Name: title,
        Description: description,
        "Due Date": date,
        Tags: tags,
        Label: priority,
        Members: members.map((member) => member.ref),
      })
      await addDoc(collection(db, "Events"), {
        author: getUser().refId,
        type: "taskUpdate",
        taskId: props.task.Id,
        projectId: props.project.id,
        timestamp: new Date(),
      });
      ElNotification({
        title: 'Task updated',
        message: `Task "${title}" has been updated`,
      })
    }

    return true;
  });
}

defineExpose({
  submit,
});

</script>

<style scoped>
  .avatar-row {
    gap: 8px;
    display: flex;
  }
  .el-dropdown-link {
    display: flex;
    gap: 4px;
    vertical-align: center;
  }
  .el-dropdown-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
<style>
  .el-dropdown-menu__item i {
    margin: 0;
  }
</style>