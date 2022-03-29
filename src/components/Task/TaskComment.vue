<template>
  <div>
    <el-space :size="8">
      <el-avatar
        :src="props.author.avatar"
        :size="24"
      />
      <p>
        {{ props.author.name }}
      </p>
    </el-space>
    <p class="content">
      {{ props.content }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  author: {
    type: Object,
    default() {
      return {};
    },
  },
  content: {
    type: String,
    default: '',
  }
})
</script>

<style scoped>
  p {
    margin: 0;
  }

  .content {
    margin-top: 8px;
  }
</style>