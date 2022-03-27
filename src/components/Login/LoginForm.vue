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
      <el-checkbox
        label="Remember password"
        name="type"
      />
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

const email = ref('');
const password = ref('');

function handleLogin() {
//adding this part a bit later
}

</script>