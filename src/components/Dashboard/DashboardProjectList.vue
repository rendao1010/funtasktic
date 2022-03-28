<template>
  <el-card>
    <typography type="h1">
      Your projects
    </typography>
    <div style="height: 24px" />
    <el-space
      style="width: 100%"  
      direction="vertical"
      alignment="stretch"
      fill="true"
    >
      <dashboard-project-item
        v-for="project in props.projects"
        :key="project"
        :project="project"
      />
    </el-space>
  </el-card>
</template>
<script setup>
  import Typography from '../../components/Typography.vue';
  import DashboardProjectItem from '../dashboard/DashboardProjectItem.vue';

  const props = defineProps({
    projects: {
      type: Array,
      default() {
        return [];
      },
    },
  });
</script>