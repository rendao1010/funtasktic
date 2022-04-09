<template>
  <el-card>
    <typography type="h1">
      Recent activity
    </typography>
    <div style="height: 24px" />
    <el-space
      v-if="props.activities.length"
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
      <Typography type="h4">
        No recent activity.
      </Typography>
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
