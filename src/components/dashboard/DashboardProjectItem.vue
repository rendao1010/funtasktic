<template>
  <el-card shadow="false">
    <typography type="h2">
      {{ props.project.title }}
    </typography>
    <typography type="overline">
      {{ props.project.subtitle }}
    </typography>
    <div style="height: 16px" />
    <typography type="h3">
      {{ props.project.description }}
    </typography>
  </el-card>
</template>
<script setup>
  import Typography from '../../components/Typography.vue';

  const props = defineProps({
    project: {
      type: Object,
      default() {
        return {};
      },
    },
  });
</script>