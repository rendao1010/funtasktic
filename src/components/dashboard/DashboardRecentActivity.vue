<template>
  <el-card>
    <typography type="h1">
      Recent activity
    </typography>
    <div style="height: 24px" />
    <dashboard-activity-item
      v-for="activity in props.activities"
      :key="activity"
      :activity="activity"
    />
  </el-card>
</template>
<script setup>
  import DashboardActivityItem from './DashboardActivityItem.vue';
  import Typography from '../../components/Typography.vue';

  const props = defineProps({
    activities: {
      type: Array,
      default() {
        return [];
      },
    },
  });
</script>
