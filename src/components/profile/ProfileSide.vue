<template>
  <div class="container">
    <el-avatar
      :src="props.user.avatar"
      :size="200"
    />
    <div class="expanded">
      <typography type="h1">
        {{ props.user.name }}
      </typography>
      <typography type="h2">
        {{ props.user.title }}
      </typography>
      <typography type="title">
        {{ props.user.location }}
      </typography>
      <typography type="title">
        {{ props.user.gender }}
      </typography>
    </div>
  </div>
</template>
<script setup>
  import Typography from '../../components/Typography.vue';

  const props = defineProps({
    user: {
      type: Object,
      default: null,
    },
  });
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.container > :not(.expanded) {
  flex: inherit;
}

.expanded {
  flex: 1;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .container {
    flex-direction: row;
  }
}
</style>