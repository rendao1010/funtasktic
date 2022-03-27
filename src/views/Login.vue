<template>
  <el-card class="card">
    <LoginForm />
  </el-card>
</template>

<script setup>
  import LoginForm from '../components/login/LoginForm.vue'
</script>

<style scoped>
  .card {
    width: 100%;
    max-width: 400px;
    margin-left: max(0px, calc(calc(100vw - 400px) * .12));
  }
</style>