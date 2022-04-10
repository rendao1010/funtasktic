<template>
  <el-tooltip
    :content="props.priority"
  >
    <el-button
      :icon="CollectionTag"
      :type="type"
      circle
      plain
    />
  </el-tooltip>
</template>
<script setup>
    import { computed } from 'vue';
    import { CollectionTag } from '@element-plus/icons-vue';
    import { ElButton, ElTooltip } from 'element-plus';

    const colorMap = {
        "Urgent": "red",
        "Priority": "orange",
        "Normal": "green",
    };

    const typeMap = {
        "Urgent": "danger",
        "Priority": "warning",
        "Normal": "success",
    };

    const props = defineProps({
        priority: {
            type: String,
            required: true,
        },
    });

    const color = computed(() => {
        return colorMap[props.priority];
    });

    const type = computed(() => {
        return typeMap[props.priority];
    });
</script>

