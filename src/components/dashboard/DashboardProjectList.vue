<template>
  <el-card>
    <div style="display: flex; justify-content: space-between;">
      <typography type="h1">
        Your projects
      </typography>
      <!-- Add button -->
      <el-button
        type="primary"
        :icon="Plus"
        size="large"
        round
        plain
        @click="props.onAddProject"
      >
        New
      </el-button>
    </div>
    <div style="height: 24px" />
    <el-space
      v-if="!props.loading"
      style="width: 100%"  
      direction="vertical"
      alignment="stretch"
      :fill="true"
    >
      <dashboard-project-item
        v-for="project in props.projects"
        :key="project"
        :project="project"
      />
      <typography
        v-if="props.projects.length === 0"
        type="title"
        style="color: #909399"
      >
        No projects to show
      </typography>
    </el-space>
    <el-space
      v-else
      style="width: 100%"  
      direction="vertical"
      alignment="stretch"
      :fill="true"
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
            style="width: 30%"
          />
        </template>
      </el-skeleton>
    </el-space>
  </el-card>
</template>
<script setup>
  import Typography from '../../components/Typography.vue';
  import DashboardProjectItem from '../dashboard/DashboardProjectItem.vue';

  import { ElSkeleton, ElSkeletonItem } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  
  const props = defineProps({
    projects: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onAddProject: {
      type: Function,
      default: () => {},
    },
  });
</script>