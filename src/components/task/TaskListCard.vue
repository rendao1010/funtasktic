<template>
  <el-card>
    <typography type="h3">
      {{ props.title }}
    </typography>
    <div style="height: 24px;" />
    <el-space
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
        <el-icon
          :color="task.color"
          class="no-inherit"
        >
          <collection-tag />
        </el-icon>
        <div>
          <typography type="title">
            {{ task.Title }}
          </typography>
          <typography type="subtitle">
            {{ task.Date }}
          </typography>
        </div>
        <div class="spacer" />
        <el-button
          :icon="DArrowRight"
          circle
          @click="props.buttonAction(task.Title)"
        />
      </div>
      <typography
        v-if="props.tasks.length === 0"
        type="title"
      >
        No tasks to show
      </typography>
    </el-space>
  </el-card>
</template>

<script setup>
import { h } from 'vue';
import { DArrowRight, CollectionTag } from '@element-plus/icons-vue';
import { ElDivider } from 'element-plus/lib/components';
import Typography from '../../components/Typography.vue';

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