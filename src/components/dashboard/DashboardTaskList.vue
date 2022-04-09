<template>
  <el-card>
    <typography type="h1">
      Your tasks
    </typography>
    <div style="height: 24px" />
    <el-space
      v-if="!loading"
      style="width: 100%"  
      direction="vertical"
      alignment="stretch"
      :fill="true"
    >
      <dashboard-task-item
        v-for="task in props.tasks"
        :key="task"
        :task="task"
        :on-task-click="props.onTaskClick"
      />
      <typography
        v-if="props.tasks.length === 0"
        type="title"
        style="color: #909399"
      >
        No tasks to show
      </typography>
    </el-space>
    
    <div
      v-else
    >
      <el-skeleton
        v-for="i in [1,2,3]"
        :key="i"
      >
        <template #template>
          <el-skeleton-item
            variant="text"
            style="margin-right: 16px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 30%; margin-bottom: 16px;"
          />
        </template>
      </el-skeleton>
    </div>
  </el-card>
</template>
<script setup>
import { ref } from 'vue';

import DashboardTaskItem from '../dashboard/DashboardTaskItem.vue';
import Typography from '../../components/Typography.vue';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps({
  tasks: {
    type: Array,
    default() {
      return [];
    },
  },
  onTaskClick: {
    type: Function,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>