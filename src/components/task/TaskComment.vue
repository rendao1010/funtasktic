<template>
  <div>
    <el-space :size="16">
      <el-avatar
        :src="props.author.avatar"
        :size="36"
      />
      <div>
        <typography type="title">
          {{ props.author["Full Name"] }}
        </typography>     
        <typography type="subtitle">
          {{ props.timestamp.toDate().toLocaleString() }}
        </typography>
      </div>
    </el-space>
    <p class="content">
      {{ props.content }}
    </p>
  </div>
</template>

<script setup>
  import Typography from '../../components/Typography.vue'

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
  },
  timestamp: {
    type: Object,
    default() {
      return {};
    },
  },
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