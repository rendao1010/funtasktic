<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    router="true"
    @select="handleSelect"
  >
    <div style="margin-inline: 32px; display: flex; align-items: center; flex-direction: vertical">
      <img
        src="@/assets/logo.png"
        height="32"
      >
    </div>
    <el-menu-item index="/">
      Home
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        Tasks
      </template>
      <el-menu-item index="addtask">
        Add Task
      </el-menu-item>
      <el-menu-item index="managetask">
        Manage Tasks
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        Services
      </template>
      <el-menu-item>Project Management</el-menu-item>
      <el-menu-item>Analytics</el-menu-item>
      <el-menu-item>Calendar</el-menu-item>
      <el-menu-item>Rewards</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="profile">
      Profile
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
