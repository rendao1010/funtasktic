<template>
  <el-card>
    <typography type="h3">
      {{ props.title }}
    </typography>
    <div style="height: 24px;" />
    <div v-if="isLoading">
      <el-skeleton />
    </div>
    <el-space
      v-else
      direction="vertical"
      alignment="stretch"
      :spacer="divider"
      class="task-list"
      :size="8"
    >
      <div
        v-for="task in props.tasks"
        :key="task"
        class="task-item"
      >
        <task-priority-icon :priority="task.Priority" />
        <div style="width: 4px" />
        <div>
          <el-link @click="props.viewTask(task)">
            <typography type="title">
              {{ task.Title }}
            </typography>
          </el-link>
          <typography type="subtitle">
            {{ task.Subtitle }}
          </typography>
        </div>
        <div class="spacer" />
        <el-tooltip
          :content="props.buttonTitle"
        >
          <el-button
            :icon="Select"
            circle
            @click="props.buttonAction(task.Id)"
          />
        </el-tooltip>
      </div>
      <typography
        v-if="props.tasks.length === 0"
        type="title"
        style="color: #909399"
      >
        No tasks to show
      </typography>
    </el-space>
  </el-card>
</template>

<script setup>
import { h } from 'vue';
import { Select, CollectionTag } from '@element-plus/icons-vue';
import { ElLink, ElTooltip, ElSkeleton, ElDivider } from 'element-plus';
import Typography from '../../components/Typography.vue';
import TaskPriorityIcon from './TaskPriorityIcon.vue';

const divider = h(ElDivider);

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  tasks: {
    type: Array,
    default() {
      return [];
    },
  },
  buttonTitle: {
    type: String,
    default: '',
  },
  buttonAction: {
    type: Function,
    default: () => {},
  },
  viewTask: {
    type: Function,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
})

</script>

<style scoped>
  .task-list {
    width: 100%;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .task-item .spacer {
    flex: 1;
  }

</style>