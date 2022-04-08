<template>
  <el-row justify="center">
    <el-col
      :span="24"
      :lg="18"
    >
      <ManageTask />
    </el-col>
  </el-row>
</template>

<script>
import ManageTask from '../components/Task/ManageTask.vue'

export default {
    name: 'App',
    components: {
        ManageTask
    }
}
</script>

<style>

</style>