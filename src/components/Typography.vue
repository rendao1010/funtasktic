<template>
  <div>
    <h1
      v-if="props.type == 'display6'"
    >
      <slot />
    </h1>
    <h2
      v-if="props.type == 'h1'"
    >
      <slot />
    </h2>
    <h3
      v-if="props.type == 'h2'"
    >
      <slot />
    </h3>
    <h4
      v-if="props.type == 'h3'"
    >
      <slot />
    </h4>
    <h5
      v-if="props.type == 'title'"
    >
      <slot />
    </h5>
    <h6
      v-if="props.type == 'subtitle'"
    >
      <slot />
    </h6>
    <p
      v-if="props.type == 'p'"
      style="font-size: var(--el-font-size-small)"
    >
      <slot />
    </p>
    <p
      v-if="props.type == 'overline'"
    >
      <slot />
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'h1',
    }
  })
</script>

<style scoped>
  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 28px;
    font-weight: normal;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 14px;
  }

  h5 {
    font-size: 18px;
    font-weight: 500;
  }
  
  h6 {
    font-size: 14px;
    font-weight: 500;
    color: grey;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
</style>