<template>
  <el-menu
    :key="route.path"
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
  >
    <div style="margin-inline: 32px; display: flex; align-items: center; flex-direction: vertical">
      <img
        src="@/assets/logo.png"
        height="32"
      >
    </div>
    <el-menu-item
      v-if="!isLoggedIn"
      index="/login"
    >
      Login
    </el-menu-item>
    <el-menu-item
      v-if="!isLoggedIn"
      index="/register"
    >
      Register
    </el-menu-item>
    <el-menu-item
      v-if="isLoggedIn"
      index="/"
    >
      Home
    </el-menu-item>
    <!-- <el-menu-item 
      v-if="isLoggedIn"
      index="/analytics"
    >
      Analytics
    </el-menu-item> -->
    <el-menu-item 
      v-if="isLoggedIn"
      index="/meetings"
    >
      Calendar
    </el-menu-item>
    <div style="flex: 1" />
    <el-sub-menu
      v-if="isLoggedIn"
      index="2"
    >
      <template #title>
        <div style="display: flex; gap: 8px; align-items: center;">
          <el-avatar
            :size="24"
            :src="user.avatar"
          />
          {{ user.name }}
        </div>
      </template>
      <el-menu-item index="/profile">
        Profile
      </el-menu-item>
      <el-menu-item index="logout">
        Log out
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ElNotification } from 'element-plus';
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { getUser, getUserAvatarURL, setUser } from '../utils/user';
import { query, collection, where, getDocs, getFirestore } from '@firebase/firestore';
import firebaseApp from '../firebase';

const router = useRouter();
const route = useRoute();
const db = getFirestore(firebaseApp);

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  const path = keyPath[keyPath.length - 1];
  if (path.startsWith('/')) {
    router.push(path);
  } else if (path === 'logout') {
    setUser(null);
    isLoggedIn.value = false;
    router.push('/login');
    ElNotification.success({
      title: 'Logged out successfully',
    });
  }
}

const user = ref({});
const isLoggedIn = ref(getUser() !== null);

const getUserInfo = async () => {
  const q = query(collection(db, "User"), where("id", "==", getUser().uid));
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

onMounted(async () => {
  if (isLoggedIn.value) {
    user.value = await getUserInfo();
  }
});

watch(() => route.path, (newPath, oldPath) => {
  if (oldPath === '/login' || oldPath === '/register') {
    isLoggedIn.value = getUser() !== null;
  }
})

</script>
<style scoped>
  .el-menu {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
  }
</style>
