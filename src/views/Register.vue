<template>
  <el-card class="card">
    <RegisterForm />
  </el-card>
</template>

<script setup>
  import RegisterForm from '../components/login/RegisterForm.vue'
</script>

<style scoped>
  .card {
    width: 100%;
    max-width: 400px;
    margin-left: max(0px, calc(calc(100vw - 400px) * .12));
  }
</style>