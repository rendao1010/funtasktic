<template>
  <el-card>
    <typography type="h1">
      Your tasks
    </typography>
    <div style="height: 24px" />
    <el-space
      style="width: 100%"  
      direction="vertical"
      alignment="stretch"
      fill="true"
    >
      <dashboard-task-item
        v-for="task in props.tasks"
        :key="task"
        :title="task.name"
        :subtitle="task.date"
        :tags="task.tags"
        :color="task.color"
      />
    </el-space>
  </el-card>
</template>
<script setup>
import { ref } from 'vue';

import DashboardTaskItem from '../dashboard/DashboardTaskItem.vue';
import Typography from '../../components/Typography.vue';

const props = defineProps({
  tasks: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>