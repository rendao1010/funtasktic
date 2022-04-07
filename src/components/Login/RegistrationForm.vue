<template>
  <div>
    <typography type="h2">
      Welcome!
    </typography>
    <div style="height: 24px;" />
    <typography type="h1">
      Sign up to
    </typography>
    <typography type="title">
      Keep your tasks organized
    </typography>
    <div style="height: 48px;" />
  </div>

  <el-form
    ref="form"
    label-position="top"
    :model="model"
    :rules="rules"
  >
    <el-form-item
      label="Full name"
      prop="fullName"
    >
      <el-input
        v-model="model.fullName"
      />
    </el-form-item>
    <el-form-item
      label="Email"
      prop="email"
    >
      <el-input
        v-model="model.email"
      />
    </el-form-item>
    <el-form-item
      label="Password"
      prop="password"
    >
      <el-input
        v-model="model.password"
        type="password"
      />
    </el-form-item>
    <el-form-item
      label="Confirm password"
      prop="confirmPassword"
    >
      <el-input
        v-model="model.confirmPassword"
        type="password"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="large"
        @click="handleRegister"
      >
        Register
      </el-button>
    </el-form-item>
    <el-form-item>
      Already have an account?&nbsp;
      <el-link
        href="/login"
        type="primary"
      >
        Log in here
      </el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import Typography from '../../components/Typography.vue';
import firebaseApp from '../../firebase.js'

import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { setUser } from '../../utils/user';

const db = getFirestore(firebaseApp);
const auth = getAuth();

const model = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  fullName: [
    { required: true, message: 'Name cannot be empty' },
  ],
  email: [
    { required: true, message: 'Email cannot be empty' },
    { type: 'email', message: 'Email is not valid' },
  ],
  password: [
    { required: true, message: 'Password cannot be empty' },
    { min: 6, message: 'Password must be at least 6 characters' },
  ],
  confirmPassword: [
    { required: true, message: 'Confirm password cannot be empty' },
    { min: 6, message: 'Confirm password must be at least 6 characters' },
    { validator: (rule, value, callback) => {
      if (value !== model.value.password) {
        callback(new Error('Passwords do not match'));
      } else {
        callback();
      }
    } },
  ],
};

const form = ref(null);

const router = useRouter();

const handleRegister = async () => {
  const { fullName, email, password } = model.value;

  // Validate fields
  const isFormValid = await form.value.validate((valid, fields) => {
    return valid;
  })

  if (!isFormValid) {
    return;
  }

  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      return userCredential.user;
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

  // Create user profile
  const ref = await addDoc(collection(db, 'User'), {
    id: user.uid,
    "Full Name": fullName,
    Description: "",
    Gender: "",
    Hobbies: "",
    Role: "",
    Location: "",
    Email: user.email,
  });

  user.refId = ref.id;

  setUser(user);
  ElNotification.success({
    title: 'Account created successfully',
    message: `Welcome ${user.email}!`,
  });
  router.push('/');
}

</script>