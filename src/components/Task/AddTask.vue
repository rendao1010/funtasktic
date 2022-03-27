<template>
  <form id="form">
    <el-space
      direction="vertical"
      alignment="stretch"
      fill="true"
      :size="24"
      style="width: 100%"
    >
      <el-row justify="center">
        <Typography type="h1">
          Add Task
        </Typography>
      </el-row>
      <task-section id="title">
        <typography type="h2">
          Title
        </typography>
        <el-input
          v-model="title"
          class="w-50 m-2"
          size="large"
          placeholder="Title"
        />
      </task-section>
      <task-section>
        <typography type="h3">
          Status
        </typography>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon
              :color="currentStatus.color"
              class="no-inherit"
            >
              <collection-tag />
            </el-icon>
            {{ currentStatus.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(status, index) in statuses"
                :key="index"
                :label="status.name"
                :value="status.value"
                @click="handleStatusChange(status)"
              >
                <el-icon
                  :color="status.color"
                  class="no-inherit"
                >
                  <collection-tag />
                </el-icon>
                {{ status.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </task-section> 
      <el-row>
        <el-col
          :xs="24"
          :md="12"
        >
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
          </task-section>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
        >
          <task-section>
            <typography type="h3">
              Due date
            </typography>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="Pick a day"
            />
          </task-section>
        </el-col>
      </el-row>
      <task-section id="tags">
        <Typography type="h3">
          Tags
        </Typography>
        <el-input
          v-model="tagInput"
          class="w-50 m-2"
          size="large"
          placeholder="Enter tag"
          @keydown.enter="addTag($event)"
          @keydown.delete="removeLastTag($event)"
        />
        <el-space wrap>
          <div
            v-for="(tag, index) in tags"
            :key="tag"
          >
            <el-button
              type="primary"
              plain
              round
              @click="removeTag(index)"
            >
              {{ tag }}<el-icon class="el-icon--right">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </el-space>
      </task-section>
      <task-section
        id="description"
      >
        <Typography
          type="h3"
        >
          Description
        </Typography>
        <el-input
          v-model="description"
          :autosize="{ minRows: 3 }"
          type="textarea"
        />
      </task-section>
      <task-section>
        <typography type="h2">
          Comments
        </typography>
        <el-space
          direction="vertical"
          alignment="stretch"
          :spacer="divider"
          :size="0"
        >
          <div 
            v-for="comment in comments"
            :key="comment"
          >
            <TaskComment
              :author="comment.author"
              :content="comment.content"
            />
          </div>
        </el-space>
      </task-section>
      <el-button
        type="primary"
        @click="saveToFS()"
      >
        Save
      </el-button>
    </el-space>
  </form>
</template>

<script setup>
import { h, ref } from 'vue';
import Typography from '../../components/Typography.vue';
import TaskSection from "./TaskSection.vue";
import TaskComment from "../../components/task/TaskComment.vue";
import { Close, CollectionTag } from "@element-plus/icons-vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDivider } from 'element-plus'

import firebaseApp from "../../firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const divider = h(ElDivider);
const members = ref([
  {
    name: 'John Doe',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
  {
    name: 'Jane Doe',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
  {
    name: 'Jack Doe',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
  {
    name: 'Jill Doe',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
])

const statuses = ref([
  {
    name: 'To do',
    color: '#f5222d',
  },
  {
    name: 'In progress',
    color: '#faad14',
  },
  {
    name: 'Done',
    color: '#52c41a',
  },
]);

const currentStatus = ref(statuses.value[0]);

const comments = ref([
  {
    author: members.value[1],
    content: 'I know, right?',
  },
  {
    author: members.value[0],
    content: 'Wow, this is so good!'
  }
])

// Task details
const tags = ref(["hello", "world", "vue", "element", "plus", "firebase"]);
const title = ref("");
const description = ref("");
const tagInput = ref("");
const date = ref(new Date());

async function saveToFS() {
  console.log("Hello");
  var title = this.title;
  var desc = this.description;
  var date = this.date;

  await setDoc(doc(db, "Tasks", title), {
    Title: title,
    Description: desc,
    Date: date,
    Status: "new",
    Tags: this.tags,
  }).then(() => {
    document.getElementById("form").reset();
  });
}

async function addTag(event) {
  event.preventDefault();
  var val = event.target.value.trim();
  if (val.length > 0) {
    this.tags.push(val);
    event.target.value = "";
  }
}

function removeLastTag (event) {
  if (event.target.value.length === 0) {
    this.removeTag(this.tags.length - 1);
  }
}

function removeTag(index) {
  this.tags.splice(index, 1);
}

function handleStatusChange(status) {
  this.currentStatus = status;
}
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