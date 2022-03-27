<template>
  <el-row gutter="32">
    <el-col
      :span="16"
      :md="16"
      :sm="24"
      :xs="24"
      style="margin-bottom: 32px;"
    >
      <el-space
        :size="32"
        direction="vertical"
        alignment="stretch"
        fill="true"
        style="width: 100%"
      >
        <dashboard-task-list :tasks="tasks" />
        <dashboard-recent-activity :activities="activities" />
      </el-space>
    </el-col>
    <el-col
      :span="8"
      :md="8"
      :sm="24"
      :xs="24"
    >
      <el-space
        :size="32"
        direction="vertical"
        alignment="stretch"
        fill="true"
        style="width: 100%"
      >
        <dashboard-project-list :projects="projects" />
        <dashboard-experience />
      </el-space>
    </el-col>
  </el-row>
</template>

<script setup>
  import { ref } from 'vue';
  import DashboardTaskList from '../dashboard/DashboardTaskList.vue'
  import DashboardProjectList from '../dashboard/DashboardProjectList.vue'
  import DashboardRecentActivity from '../dashboard/DashboardRecentActivity.vue'
  import DashboardExperience from '../dashboard/DashboardExperience.vue'
  
  const tasks = ref([
    {
      name: 'Buy groceries',
      date: 'Tomorrow',
      tags: [
        'Ops',
        'UI Design',
      ],
      color: '#F5222D',
    }
  ]);

  const projects = ref([
    {
      title: 'Budget',
      subtitle: 'Created by: Chris Hemsworth\nMembers: Stacy, Lilian, Chalice, Micheal',
      description: 'Outstanding tasks: 4'
    }
  ]);

  const activities = ref([
    {
      user: 'Chris Hemsworth',
      action: 'Added a new task',
      date: 'Yesterday',
      importance: 'primary',
    }
  ])
</script>