<template>
  <typography type="h2">
    About me
  </typography>
  <div>
    {{ props.user.aboutMe }}
  </div>
  <el-divider />
  <typography type="h2">
    Past experience
  </typography>
  <div>
    {{ props.user.pastExperience }}
  </div>
  <el-divider />
  <typography type="h2">
    Hobbies
  </typography>
  <div>
    {{ props.user.hobbies }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Typography from '../../components/Typography.vue';

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

</script>