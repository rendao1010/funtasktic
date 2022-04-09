<template>
  <el-space :size="16">
    <el-avatar
      :size="36"
      :src="props.activity.userAvatar"
    />
    <div>
      <typography type="title">
        {{ props.activity.user }} {{ props.activity.action }}
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