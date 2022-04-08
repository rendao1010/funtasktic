<template>
  <a
    :href="'project/'+ props.project.id.replaceAll(' ', '-')"
  >
    <el-card
      shadow="hover"
    >
      <typography type="h2">
        {{ props.project.title }}
      </typography>
      <typography type="overline">
        {{ props.project.subtitle }}
      </typography>
    </el-card>
  </a>
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
<style scoped>
a {
  text-decoration: none; /* no underline */
}
</style>