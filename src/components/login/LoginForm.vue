<template>
  <div>
    <typography type="h2">
      Welcome!
    </typography>
    <div style="height: 24px;" />
    <typography type="h1">
      Log in to
    </typography>
    <typography type="title">
      Keep your tasks organized
    </typography>
    <div style="height: 48px;" />
  </div>
  <el-form label-position="top">
    <el-form-item label="Email">
      <el-input
        v-model="email"
      />
    </el-form-item>
    <el-form-item label="Password">
      <el-input
        v-model="password"
        type="password"
      />
    </el-form-item>
    <el-form-item style="display: flex">
      <div style="flex: 1" />
      <el-link
        href="https://google.com"
        target="_blank"
        type="info"
      >
        Forgot password?
      </el-link>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="large"
        @click="handleLogin"
      >
        Log in
      </el-button>
    </el-form-item>
    <el-form-item>
      Don't have an account?&nbsp;
      <el-link
        href="/register"
        type="primary"
      >
        Sign up here
      </el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import Typography from '../../components/Typography.vue';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, getFirestore, collection, where, query } from "firebase/firestore";
import firebaseApp from '../../firebase.js';
import { ElNotification } from 'element-plus';
import { setUser } from '../../utils/user';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

const db = getFirestore(firebaseApp);

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const user = await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      ElNotification.success({
        title: 'Logged in successfully',
        message: `Welcome ${user.email}!`,
      });

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      ElNotification.error({
        title: 'Error',
        message: errorMessage,
      });
      return null;
    });

    if (user == null) {
      return;
    }

  // Get ref
  const q = query(collection(db, 'User'), where('Email', '==', user.email));
  const result = await getDocs(q);
  const refId = result.docs[0].ref.id;
  user.refId = refId;
  setUser(user);
  router.push('/');
}

</script>