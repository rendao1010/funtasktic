<template>
  <div
    class="background"
  >
    <el-card class="card">
      <LoginForm />
    </el-card>
  </div>
</template>

<script setup>
  import LoginForm from '../components/login/LoginForm.vue'
</script>

<style scoped>
  .card {
    width: 100%;
    max-width: 400px;
  }

  .background {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1260px) {
    .background {
      background-image: url('~@/assets/login_banner.png');
      background-size: cover-fit; 
      background-position: right;
      background-repeat: no-repeat;
    }

    .card {
      margin-left: max(0px, calc(calc(100vw - 400px) * .12));
    }
  }

  @media screen and (max-width: 1260px) {
    .background {
      justify-content: center;
    }
  }
   
</style>