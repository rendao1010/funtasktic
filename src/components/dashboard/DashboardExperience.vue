<template>
  <el-card>
    <typography type="h1">
      Your EXP
    </typography>
    <div style="height: 24px" />
    <el-row class="info">
      <el-col
        :span="12"
        class="centered"
      >
        <typography type="display6">
          0
        </typography>
        <typography type="title">
          Total EXP accumulated
        </typography>
      </el-col>
      <el-col
        :span="12"
        class="centered"
      >
        <typography type="display6">
          0
        </typography>
        <typography type="title">
          EXP this week
        </typography>
      </el-col>
    </el-row>
    <div style="height: 24px" />
    <typography
      class="centered"
      type="h3"
    >
      Your Current Leaderboard Placing: 1st
    </typography>
  </el-card>
</template>
<script setup>
  import Typography from '../../components/Typography.vue';
</script>
<style scoped>
  .centered {
    text-align: center;
  }
</style>