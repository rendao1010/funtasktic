<template>
  <el-space :size="16">
    <el-button
      :icon="Check"
      circle
      :type="props.activity.importance"
    />
    <div>
      <typography type="title">
        {{ props.activity.user }} {{ props.activity.actions }}
      </typography>
      <typography type="subtitle">
        {{ props.activity.date }}
      </typography>
    </div>
  </el-space>
</template>
<script setup>
  import { Check } from '@element-plus/icons-vue';
  import Typography from '../../components/Typography.vue';

  const props = defineProps({
    activity: {
      type: Object,
      default() {
        return {};
      },
    },
  });
</script>