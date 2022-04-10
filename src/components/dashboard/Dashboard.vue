<template>
  <el-row :gutter="32">
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
        :fill="true"
        style="width: 100%"
      >
        <dashboard-task-list
          :tasks="tasks"
          :loading="isLoading"
          :on-task-click="showTaskDialog"
        />
        <dashboard-recent-activity :activities="events" />
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
        :fill="true"
        style="width: 100%"
      >
        <dashboard-project-list
          :projects="projects"
          :loading="isLoading"
          :on-add-project="showAddProjectDialog"
        />
        <dashboard-experience />
      </el-space>
    </el-col>
  </el-row>

  <!-- Add project dialog -->
  <el-dialog
    v-model="isProjectDialogVisible"
    title="Add project"
    destroy-on-close
  >
    <add-project ref="addProjectDialog" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isProjectDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="tryAddProject"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- Task dialog -->
  <el-dialog
    v-model="isTaskDialogVisible"
    title="View task"
    destroy-on-close
  >
    <add-task-dialog
      ref="addTaskDialog"
      :is-editing="true"
      :task="dialogTask"
      :project="dialogTaskProject"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isTaskDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="trySubmit"
        >
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import DashboardTaskList from '../dashboard/DashboardTaskList.vue'
  import DashboardProjectList from '../dashboard/DashboardProjectList.vue'
  import DashboardRecentActivity from '../dashboard/DashboardRecentActivity.vue'
  import DashboardExperience from '../dashboard/DashboardExperience.vue'
  import AddProject from '../project/AddProject.vue'
  import AddTaskDialog from '../task/AddTaskDialog.vue'

  import { ref, onMounted, computed } from 'vue';
  import firebaseApp from '../../firebase.js' 
  import { doc, getFirestore, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
  import { getUser } from '../../utils/user'
  import { docToTask, getUsers, getTasks } from '../../utils/firebase/user'

  const db = getFirestore(firebaseApp);
  const users = ref([]);

  async function getProjects() {
    const q = query(collection(db, "Project"), where("Members", "array-contains", doc(db, "User", getUser().refId)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }
    const projects = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const memberRefs = data.Members;

      const members = [];
      for (const memberRef of memberRefs) {
        const member = await getDoc(memberRef);
        members.push({
          ...member.data(),
          id: memberRef.id,
        });
      }

      projects.push({
        id: doc.id,
        title: data.Title,
        subtitle: members.map(member => member["Full Name"]).join(', '),
        members: members,
      });
    }

    return projects;
  }

  
  const tasks = ref([]);

  const projects = ref([
    {
      title: 'Budget',
      subtitle: 'Created by: Chris Hemsworth\nMembers: Stacy, Lilian, Chalice, Micheal',
      description: 'Outstanding tasks: 4'
    }
  ]);

  // const activities = ref([
  //   {
  //     user: 'Chris Hemsworth',
  //     action: 'Added a new task',
  //     date: 'Yesterday',
  //     importance: 'primary',
  //   }
  // ]);

  const events = ref([]);

  const isLoading = ref(true);
  const isTaskDialogVisible = ref(false);
  const isProjectDialogVisible = ref(false);
  const addProjectDialog = ref(null);
  const addTaskDialog = ref(null);
  const dialogTask = ref({});
  const dialogTaskProject = ref('');

  onMounted(async () => {
    users.value = await getUsers();
    projects.value = await getProjects();
    tasks.value = await getTasks(users.value);
    events.value = await getEvents(users.value, projects.value);
    isLoading.value = false;
  });

  const showAddProjectDialog = () => {
    isProjectDialogVisible.value = true;
  }

  const showTaskDialog = (task) => {
    dialogTask.value = task;
    dialogTaskProject.value = projects.value.find(project => project.id === task.ProjectId);
    isTaskDialogVisible.value = true;
  }

  const tryAddProject = () => {
    addProjectDialog.value.trySubmit();
  }

  const trySubmit = async () => {
    if (await addTaskDialog.value.submit()) {
      isTaskDialogVisible.value = false;
      tasks.value = await getTasks(users.value);
    }
  }
  
  const getEvents = async(users, projects) => {
    const projectIds = projects.map(project => project.id);
    const q = query(collection(db, "Events"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const events = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (!projectIds.includes(data.projectId)) {
        continue;
      }

      const taskName = tasks.value.find(task => task.Id === data.taskId).Title;
      const action = data.type === 'taskComment' ? `commented on "${taskName}"` : `edited "${taskName}"`;

      events.push({
        user: users.find(user => user.ref.id === data.author)["Full Name"],
        userAvatar: users.find(user => user.ref.id === data.author).avatar,
        action: action,
        date: data.timestamp.toDate().toLocaleDateString(),
        importance: "primary",
      });
    }

    return events;
  }
</script>