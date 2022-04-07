<template>
  <div class="container">
    <div>
      <typography type="title">
        {{ props.title }}
      </typography>
      <typography type="subtitle">
        {{ props.subtitle }}
      </typography>
    </div>
    <div class="actions">
      <div>
        <el-button
          v-for="tag in props.tags"
          :key="tag"
          type="primary"
          round
          plain
        >
          {{ tag }}
        </el-button>
      </div>
      <el-icon
        :color="props.color"
        class="no-inherit"
      >
        <collection-tag />
      </el-icon>
    </div>
  </div>
</template>
<script setup>
  import { CollectionTag } from '@element-plus/icons-vue';
  import Typography from '../../components/Typography.vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      default: '',
    },
  });


</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>