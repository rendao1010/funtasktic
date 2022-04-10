<template>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  >
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  >
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
    rel="stylesheet"
  >
  <el-container
    direction="vertical"
  >
    <NavBar />
    <el-main
      class="
    main"
    >
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
:root, button {
  font-family: 'Poppins', sans-serif;
  --el-color-primary: #063F68 !important;
}

.info {
  color: grey;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  position: fixed;
  width: 100%;
}

button.el-button {
  font-weight: 600;
}

.main.el-main {
  overflow: hidden;
  margin-top: 72px;
}

</style>
