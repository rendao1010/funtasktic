<template>
  <el-row justify="center">
    <el-col
      :span="24"
      :lg="18"
    >
      <project-overview />
    </el-col>
  </el-row>
</template>

<script>
import ProjectOverview from '../components/project/ProjectOverview.vue'

export default {
    name: 'App',
    components: {
        ProjectOverview,
    }
}
</script>
