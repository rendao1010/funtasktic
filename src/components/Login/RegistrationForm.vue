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

  <el-form label-position="top">
    <el-form-item label="Full name">
      <el-input
        v-model="fullName"
      />
    </el-form-item>
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
    <el-form-item label="Confirm password">
      <el-input
        v-model="confirmPassword"
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


//this part i will connect to firebase and import from there
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

function handleRegister() {
//after the registration, the function here adds the user to the firebase
}

</script>