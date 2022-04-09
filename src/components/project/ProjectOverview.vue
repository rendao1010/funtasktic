<template>
  <el-space
    id="projectView"
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
      <typography
        v-if="!isLoading"
        type="h1"
      >
        {{ project.title }}
      </typography>
      <typography
        v-if="!isLoading"
        type="p"
      >
        {{ project.description }}
      </typography>
      <div>
        <p>Members</p>
        <ul>
          <li
            v-for="member in project.members"
            :key="member"
          >
            {{ users.find(user => user.ref.id === member.id)["Full Name"] }}
          </li>
        </ul>
      </div>
      <el-skeleton v-if="isLoading" />
      <div
        v-if="isAdmin"
        id="projectActions"
      >
        <a @click="showAddTaskDialog">
          <el-button
            type="primary"
            :icon="Plus"
            plain
          >Add task</el-button>
        </a>
        <a @click="showAddMeetingDialog">
          <el-button
            type="primary"
            :icon="Plus"
            plain
          >Schedule meeting</el-button>
        </a>
      </div>
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
          button-title="Start task"
          :button-action="startTask"
          :view-task="viewTask"
          :is-loading="isLoading"
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
          button-title="Mark as complete"
          :button-action="completeTask"
          :view-task="viewTask"
          :is-loading="isLoading"
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
          :view-task="viewTask"
          :is-loading="isLoading"
        />
      </el-col>
    </el-row>
  </el-space>
  <el-dialog
    v-model="isAddTaskDialogVisible"
    :title="taskDialogTitle"
    destroy-on-close
  >
    <add-task-dialog
      ref="addTaskDialog"
      :is-editing="isEditingTask"
      :task="dialogTask"
      :project="project"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isAddTaskDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="trySubmitTaskDialog"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="isAddMeetingDialogVisible"
    title="Schedule meeting"
    destroy-on-close
  >
    <add-meeting-dialog
      ref="addMeetingDialog"
      :is-editing="isEditingTask"
      :task="dialogTask"
      :project-id="projectId"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isAddMeetingDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="trySubmitMeetingDialog"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { computed, onMounted, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

import { ElDialog, ElSkeleton } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import Typography from '../../components/Typography.vue';
import AddTaskDialog from '../task/AddTaskDialog.vue';
import AddMeetingDialog from '../meetings/AddMeetingDialog.vue';
import TaskListCard from '../task/TaskListCard.vue';

import { getUsers, docToTask } from '../../utils/firebase/user.js';
import firebaseApp from '../../firebase.js'
import { getFirestore, collection, getDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getUser } from '../../utils/user';
const db = getFirestore(firebaseApp);

const route = useRoute();

const addTaskDialog = ref(null);
const addMeetingDialog = ref(null);

const project = ref({});
const newTaskList = ref([]);
const ongoingTaskList = ref([]);
const completedTaskList = ref([]);

const isLoading = ref(true);
const isAddTaskDialogVisible = ref(false);
const isAddMeetingDialogVisible = ref(false);
const dialogTask = ref({});
const isEditingTask = ref(false);
const taskDialogTitle = computed(() => {
  return isEditingTask.value ? 'View task' : 'Add task';
});
const projectId = computed(() => {
  return (route.params.projectId ?? '').replaceAll('-', ' ');
});
const users = ref([]);

onMounted(async () => {
  users.value = await getUsers();
  await updateProject(projectId.value);
});

const isAdmin = ref(false);

const updateProject = async (projectId) => {
  project.value = await getProject(projectId);
  isAdmin.value = project.value.members[project.value.members.length - 1].id === getUser().refId;
  newTaskList.value = await getNewTasks(projectId);
  ongoingTaskList.value = await getOngoingTasks(projectId);
  completedTaskList.value = await getCompletedTasks(projectId);
  isLoading.value = false;
}

const getProject = async (projectId) => {
    const projectDoc = await getDoc(doc(db, "Project", projectId));
    const data = projectDoc.data();
    return {
      title: data.Title,
      description: data.Description,
      members: data.Members,
      id: projectId,
    };
}

const getNewTasks = async (projectId) => {
  const q = query(collection(db, "Tasks"), where("Status", "==", "New"), where("Project", "==", doc(db, "Project", projectId)));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => docToTask(doc, users.value));
}

const getOngoingTasks = async (projectId) => {
  const q = query(collection(db, "Tasks"), where("Status", "==", "Ongoing"), where("Project", "==", doc(db, "Project", projectId)));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => docToTask(doc, users.value));
}

const getCompletedTasks = async (projectId) => {
  const q = query(collection(db, "Tasks"), where("Status", "==", "Completed"), where("Project", "==", doc(db, "Project", projectId)));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => docToTask(doc, users.value));
}

const startTask = async (taskId) => {
  const taskRef = doc(db, "Tasks", taskId)
  await updateDoc(taskRef, {
      Status: "Ongoing"
  })
  updateProject(projectId.value);
}

const completeTask = async (taskId) => {
  const taskRef = doc(db, "Tasks", taskId)
  await updateDoc(taskRef, {
      Status: "Completed"
  })
  updateProject(projectId.value);
}

const deleteTask = async (taskTitle) => {
  // TODO: implement
}

const trySubmitTaskDialog = async () => {
  if (await addTaskDialog.value.submit()) {
    isAddTaskDialogVisible.value = false;
    updateProject(projectId.value);
  }
}

const trySubmitMeetingDialog = async () => {
  if (await addMeetingDialog.value.submit()) {
    isAddMeetingDialogVisible.value = false;
    // updateProject(projectId.value);
  }
}

const showAddTaskDialog = () => {
  isAddTaskDialogVisible.value = true;
  dialogTask.value = {};
  isEditingTask.value = false;
}

const showAddMeetingDialog = () => {
  isAddMeetingDialogVisible.value = true;
}

const viewTask = (task) => {
  dialogTask.value = task;
  isEditingTask.value = true;
  isAddTaskDialogVisible.value = true;
}

// Listen to vue router route param changes
watch(() => route.params.projectId, () => {
  updateProject(projectId.value);
});
</script>

<style scoped>
.el-col {
  margin-bottom: 32px !important;
}

#projectView {
  width: 100%;
}

#projectActions {
  display: flex;
  gap: 8px;
}

a {
  text-decoration: none;
}
</style>