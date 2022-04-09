<template>
  <el-row
    justify="center"
  >
    <el-col
      :span="20"
      :md="20"
      :sm="24"
      :xs="24"
    >
      <el-row :gutter="32">
        <el-col
          :span="6"
          :md="8"
          :sm="24"
          :xs="24"
        >
          <div>
            <profile-side
              v-if="!isLoading"
              :user="user"
            />
            <el-skeleton v-else />
            <el-button
              :icon="Edit"
              type="primary"
              @click="showEditProfileDialog()"
            >
              Edit
            </el-button>
            <el-divider class="hidden-md-and-up" />
          </div>
        </el-col>
        <el-col
          :span="18"
          :md="16"
          :sm="24"
          :xs="24"
        >
          <profile-main-section
            v-if="!isLoading"
            :user="user"
          />
          <el-skeleton v-else />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  
  <el-dialog
    v-model="isDialogVisible"
    title="Edit profile"
    destroy-on-close 
  >
    <edit-profile-dialog 
      ref="editProfileDialog"
      :user-info="user"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="trySubmit"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import ProfileMainSection from '../components/profile/ProfileMainSection.vue'
  import ProfileSide from '../components/profile/ProfileSide.vue'
  import EditProfileDialog from '../components/profile/EditProfileDialog.vue'
  import 'element-plus/theme-chalk/display.css'

  import { getUser, getUserAvatarURL } from '../utils/user.js';
  import { collection, query, getDocs, getFirestore, where } from '@firebase/firestore';
  import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
  import firebaseApp from '../firebase.js';

  const db = getFirestore(firebaseApp);
  const uid = ref(getUser().uid);

  const isLoading = ref(true);
  const editProfileDialog = ref(null);
  const isDialogVisible = ref(false);

  const getUserInfo = async () => {
    const q = query(collection(db, "User"), where("id", "==", uid.value));
    const querySnapshot = await getDocs(q);
    const userInfo = querySnapshot.docs[0].data();
    
    const imageUrl = await getUserAvatarURL();

    return {
      name: userInfo["Full Name"],
      title: userInfo["Role"],
      location: userInfo.Location,
      hobbies: userInfo.Hobbies,
      gender: userInfo.Gender,
      avatar: imageUrl,
      aboutMe: userInfo.Description,
      pastExperience: userInfo["Past Experience"],
      role: userInfo.Role
    }
  }

  const user = ref(
    {
      name: "Harry Maguire",
      role: "Software Engineer",
      location: "London, UK",
      gender: "Male",
      avatar: "https://d3vlf99qeg6bpx.cloudfront.net/content/uploads/2022/03/16120029/Harry-Maguire-2-1.jpg",
      aboutMe: "I am a software engineer with a passion for building software that improves the lives of people.",
      hobbies: "I love to play the guitar, and I love to code.",
      pastExperience: "I have been working in the IT industry for more than 10 years. I have worked on a number of projects in the IT industry, including:",
    }
  )

  onMounted(async () => {
    user.value = await getUserInfo();
    isLoading.value = false;
  });

  const showEditProfileDialog = () => {
    isDialogVisible.value = true;
  };

  const trySubmit = async() => {
    if (editProfileDialog.value.trySubmit()) {
      isDialogVisible.value = false;
      user.value = await getUserInfo();
    }
  }
    
</script>

<style scoped>
  .centered {
    display: flex;
    
    justify-content: center;
  }
</style>
