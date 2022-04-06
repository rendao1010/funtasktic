<template>
  <el-row justify="center">
    <el-col
      :span="12"
      :md="12"
      :sm="18"
      :xs="24"
    >
      <AddTask />
    </el-col>
  </el-row>
</template>

<script setup>
  import AddTask from '../components/Task/AddTask.vue'
</script>

<style>

</style>