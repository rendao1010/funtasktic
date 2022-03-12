<template>
  <h1>Welcome to FunTaskTic!</h1>
  <router-link to="/addtask">Add Task</router-link> |
  <router-link to="/managetask">Manage Task</router-link>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
