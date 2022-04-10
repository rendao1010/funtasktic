<template>
  <div>
    <typography type="h1">
      {{ props.title }}
    </typography>
    <typography type="h2">
      {{ props.subtitle }}
    </typography>
    <typography type="p">
      {{ props.completionCount }}
    </typography>
  </div>
</template>
<script setup>
  import Typography from '../Typography.vue';

  const props = defineProps(
    {
      title: {
        type: String,
        default: '',
      },
      subtitle: {
        type: String,
        default: '',
      },
      completionCount: {
        type: Number,
        default: 0,
      },
    }
  );
</script>
