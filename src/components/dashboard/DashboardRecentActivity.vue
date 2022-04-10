<template>
  <el-card>
    <typography type="h1">
      Recent activity
    </typography>
    <div style="height: 24px" />
    <el-space
      v-if="props.activities.length > 0"
      :size="36"
      direction="vertical"
      alignment="stretch"
    >
      <dashboard-activity-item
        v-for="activity in props.activities"
        :key="activity"
        :activity="activity"
      />
    </el-space>
    <div
      v-else
    >
      <typography
        type="title"
        style="color: #909399"
      >
        No recent activity
      </typography>
    </div>
  </el-card>
</template>
<script setup>
  import DashboardActivityItem from './DashboardActivityItem.vue';
  import Typography from '../../components/Typography.vue';

  import { ElCard, ElSpace } from 'element-plus';

  const props = defineProps({
    activities: {
      type: Array,
      default() {
        return [];
      },
    },
  });
</script>
