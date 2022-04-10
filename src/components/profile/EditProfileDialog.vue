<template>
  <el-form
    ref="form"
    :model="model"
    label-position="top"
  >
    <el-upload
      :file-list="fileList"
      action=""
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      list-type="picture"
    >
      <el-button type="primary">
        Click to upload
      </el-button>
    </el-upload>
    <el-form-item
      label="Gender"
      prop="gender"
    >
      <el-input v-model="model.gender" />
    </el-form-item>
    <el-form-item
      label="About me"
      prop="aboutMe"
    >
      <el-input v-model="model.aboutMe" />
    </el-form-item>
    <el-form-item
      label="Past experience"
      prop="pastExperience"
    >
      <el-input v-model="model.pastExperience" />
    </el-form-item>
    <el-form-item
      label="Hobbies"
      prop="hobbies"
    >
      <el-input v-model="model.hobbies" />
    </el-form-item>
    <el-form-item
      label="Location"
      props="location"
    >
      <el-input v-model="model.location" />
    </el-form-item>
    <el-form-item
      label="Role"
      props="role"
    >
      <el-input v-model="model.role" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from 'vue';
import firebaseApp from '../../firebase.js';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { ElForm, ElUpload, ElNotification } from 'element-plus';
import { getUser } from '../../utils/user.js';
import { useRouter } from 'vue-router';

const db = getFirestore(firebaseApp);
const router = useRouter();

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
});

const fileList = ref([]);

const model = ref({
  aboutMe: props.userInfo.aboutMe ?? '',
  pastExperience: props.userInfo.pastExperience ?? '',
  hobbies: props.userInfo.hobbies ?? '',
  location: props.userInfo.location ?? '',
  role: props.userInfo.role ?? '',
  gender: props.userInfo.gender ?? '',
});

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
}

const trySubmit = async () => {
  await updateDoc(doc(db, 'User', getUser().refId), {
    Description: model.value.aboutMe,
    Hobbies: model.value.hobbies,
    Location: model.value.location,
    Role: model.value.role,
    "Past Experience": model.value.pastExperience,
    Gender: model.value.gender,
  }).then(() => {
    ElNotification.success({
      title: 'Success',
      message: 'Profile updated successfully'
    });
    return true;
  }).catch((error) => {
    ElNotification.error({
      title: 'Error',
      message: error.message
    });
    return false;
  });

  if (fileList.value.length > 0) {
    // Create a root reference
    const storage = getStorage();

    const imageRef = storageRef(storage, getUser().uid + '.jpg');

    uploadBytes(imageRef, fileList.value[0].raw).then((snapshot) => {
      ElNotification.success({
        title: 'Success',
        message: 'Avatar updated successfully'
      });
    });
  }
}


defineExpose({
  trySubmit,
});

</script>
