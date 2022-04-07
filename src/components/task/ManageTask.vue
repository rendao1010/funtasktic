<template>
  <el-space
    direction="vertical"
    alignment="stretch"
    :size="32"
  >
    <el-space
      id="projectTitle"
      direction="vertical"
      alignment="stretch"
      :size="16"
    >
      <el-space
        direction="horizontal"
        :size="16"
      >
        <el-avatar
          :src="project.avatar"
          :size="64"
        />
        <typography type="h1">
          {{ project.title }}
        </typography>
      </el-space>
      <typography type="p">
        {{ project.description }}
      </typography>
    </el-space>
    <el-row :gutter="16">
      <el-col
        :md="8"
        :sm="24"
      >
        <task-list-card
          id="newTasks"
          title="New tasks"
          :tasks="newTaskList"
          button-title="Start"
          :button-action="startTask"
        />
      </el-col>
      <el-col
        :md="8"
        :sm="24"
      >
        <task-list-card
          id="ongoingTasks"
          title="Ongoing tasks"
          :tasks="ongoingTaskList"
          button-title="Complete"
          :button-action="completeTask"
        />
      </el-col>
      <el-col
        :md="8"
        :sm="24"
      >
        <task-list-card
          id="completedTasks"
          title="Completed tasks"
          :tasks="completedTaskList"
          button-title="Delete"
          :button-action="deleteTask"
        />
      </el-col>
    </el-row>
  </el-space>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from '@vue/runtime-core';

import Typography from '../../components/Typography.vue';
import TaskListCard from './TaskListCard.vue';

import firebaseApp from '../../firebase.js'
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
const db = getFirestore(firebaseApp)

const project = {
    title: 'Project title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
}

const newTaskList = ref([
  {
    Title: 'New task 1',
    Date: 'Today',
    color: '#f5222d',
  },
  {
    Title: 'New task 2',
    Date: 'Tomorrow',
    color: '#f5222d',
  },
]);
const ongoingTaskList = ref([]);
const completedTaskList = ref([]);

onMounted(() => {
    getNewTasks()
    getOngoingTasks()
    getCompletedTasks()
});

async function getNewTasks() {
    var q = query(collection(db, "Tasks"), where("Status", "==", "new"))
    var querySnapshot = await getDocs(q)
    querySnapshot.forEach((document) => this.newTaskList.push(document.data()))
}

async function getOngoingTasks() {
    var q = query(collection(db, "Tasks"), where("Status", "==", "ongoing"))
    var querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach((document) => this.ongoingTaskList.push(document.data()))
}

async function getCompletedTasks() {
    var q = query(collection(db, "Tasks"), where("Status", "==", "completed"))
    var querySnapshot = await getDocs(q)
    querySnapshot.forEach((document) => this.completedTaskList.push(document.data()))
}

async function startTask(taskTitle) {
    var taskRef = doc(db, "Tasks", taskTitle)
    await updateDoc(taskRef, {
        Status: "ongoing"
    })
    window.location.reload()
}

async function completeTask(taskTitle) {
    var taskRef = doc(db, "Tasks", taskTitle)
    await updateDoc(taskRef, {
        Status: "completed"
    })
    window.location.reload()
}

async function deleteTask(taskTitle) {
  // To implement
}

</script>

<style scoped>
.el-col {
  margin-bottom: 32px !important;
}
</style>