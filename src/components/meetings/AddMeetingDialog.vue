<template>
  <el-form
    id="form"
    ref="form"
    :rules="rules"
    :model="model"
  >
    <el-space
      direction="vertical"
      alignment="stretch"
      :fill="true"
      :size="24"
      style="width: 100%"
    >
      <task-section id="title">
        <typography type="h2">
          Title
        </typography>
        <el-form-item prop="title">
          <el-input
            v-model="model.title"
            class="w-50 m-2"
            size="large"
            placeholder="e.g., Meeting with the team"
          />
        </el-form-item>
      </task-section>
      <task-section id="venue">
        <typography type="h2">
          Venue
        </typography>
        <el-form-item prop="venue">
          <el-input
            v-model="model.venue"
            class="w-50 m-2"
            size="large"
            placeholder="e.g., Meeting Room 1"
          />
        </el-form-item>
      </task-section>
      <task-section>
        <typography type="h3">
          Due date
        </typography>
        <el-form-item prop="date">
          <el-date-picker
            v-model="model.date"
            type="datetime"
            placeholder="Pick a day"
          />
        </el-form-item>
      </task-section>
      <task-section>
        <typography type="h3">
          Members
        </typography>
        <div class="avatar-row">
          <el-avatar
            v-for="member in members"
            :key="member"
            :size="36"
            :src="member.avatar"
          />
        </div>
        <user-autocomplete 
          :on-add-user="addMember"
          :search-filter="filterMembers"
        />
        <el-space wrap>
          <div
            v-for="(member, index) in model.members"
            :key="member"
          >
            <el-button
              type="primary"
              plain
              round
              @click="removeMember(index)"
            >
              {{ member["Full Name"] }}<el-icon class="el-icon--right">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </el-space>
      </task-section>
    </el-space>
  </el-form>
</template>

<script setup>
import { h, onMounted, ref } from 'vue';
import Typography from '../../components/Typography.vue';
import TaskSection from "../task/TaskSection.vue";
import TaskComment from "../../components/task/TaskComment.vue";
import TaskPriorityIcon from "../../components/task/TaskPriorityIcon.vue";
import UserAutocomplete from "../project/UserAutocomplete.vue";
import { Close, CollectionTag } from "@element-plus/icons-vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDivider, ElNotification } from 'element-plus'

import firebaseApp from "../../firebase.js";
import { arrayUnion, collection, getFirestore, doc, setDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { getUser } from '../../utils/user';
import { getUsers } from '../../utils/firebase/user';
const db = getFirestore(firebaseApp);

const divider = h(ElDivider);

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const form = ref();
const rules = ref({
  title: [
    { required: true, message: 'Title cannot be empty' },
  ],
  date: [
    { required: true, message: 'Meeting time cannot be empty' },
  ],
});

const priorities = ['Urgent', 'Priority', 'Normal'];
const tagInput = ref("");
const commentInput = ref("");
const users = ref([]);

onMounted(async () => {
  users.value = await getUsers();
});

// Task details
const model = ref({
  title: "",
  venue: "",
  date: null,
  members: [],
});

const addMember = (user) => {
  model.value.members.push(user);
}

const removeMember = (index) => {
  model.value.members.splice(index, 1);
};

const filterMembers = (u) => !model.value.members.includes(u);

async function addTag(event) {
  event.preventDefault();
  var val = event.target.value.trim();
  if (val.length > 0) {
    model.value.tags.push(val);
    event.target.value = "";
  }
}

async function submit() {
  return await form.value.validate(async (valid, fields) => {
    if (!valid) {
      return false;
    }

    const title = model.value.title;
    const venue = model.value.venue;
    const date = model.value.date;
    const members = model.value.members;

    await addDoc(collection(db, "Meeting"), {
      Name: title,
      Venue: venue,
      Date: date,
      Project: doc(db, "Project", props.projectId),
      Members: members.map((member) => member.ref),
    });
    ElNotification({
      title: 'Meeting schedule',
      message: `Meeting "${title}" has been scheduled`,
    })

    return true;
  });
}

defineExpose({
  submit,
});

</script>

<style scoped>
  .avatar-row {
    gap: 8px;
    display: flex;
  }
  .el-dropdown-link {
    display: flex;
    gap: 4px;
    vertical-align: center;
  }
  .el-dropdown-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
<style>
  .el-dropdown-menu__item i {
    margin: 0;
  }
</style>