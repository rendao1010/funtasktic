<template>
  <div class="container">
    <div>
      <el-link @click="props.onTaskClick(props.task)">
        <typography type="title">
          {{ props.task.Title }}
        </typography>
      </el-link>
      <typography type="subtitle">
        {{ props.task['Due Date'] }}
      </typography>
    </div>
    <div class="actions">
      <div>
        <el-button
          v-for="tag in props.task.Tags"
          :key="tag"
          type="primary"
          round
          plain
        >
          {{ tag }}
        </el-button>
      </div>
      <task-priority-icon :priority="props.task.Priority" />
    </div>
  </div>
</template>
<script setup>
  import { CollectionTag } from '@element-plus/icons-vue';
  import Typography from '../../components/Typography.vue';
  import TaskPriorityIcon from '../../components/task/TaskPriorityIcon.vue';

  const props = defineProps({
    task: {
      type: Object,
      default: () => {},
    },
    onTaskClick: {
      type: Function,
      default: () => {},
    },
  });
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>