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
      <el-row>
        <el-col
          :xs="24"
          :md="12"
        >
          <task-section>
            <typography type="h3">
              Priority
            </typography>
            <el-dropdown>
              <el-button
                class="el-dropdown-link"
                size="large"
              >
                <div style="display: flex; align-items: center; gap: 12px">
                  <task-priority-icon :priority="model.priority" />
                  {{ model.priority }}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </div>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(priority, index) in priorities"
                    :key="index"
                    :label="priority"
                    :value="priority"
                    @click="handlePriorityChange(priority)"
                  >
                    <div style="display: flex; align-items: center; gap: 12px">
                      <task-priority-icon :priority="priority" />
                      {{ priority }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
            <el-form-item prop="date">
              <el-date-picker
                v-model="model.date"
                type="date"
                placeholder="Pick a day"
              />
            </el-form-item>
          </task-section>
        </el-col>
      </el-row>
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
            v-for="(tag, index) in model.tags"
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
          v-model="model.description"
          :autosize="{ minRows: 3 }"
          type="textarea"
          placeholder="e.g., Discuss the next steps for the project."
        />
      </task-section>
      <task-section v-if="props.isEditing">
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
    </el-space>
  </el-form>
</template>

<script setup>
import { h, ref } from 'vue';
import Typography from '../../components/Typography.vue';
import TaskSection from "./TaskSection.vue";
import TaskComment from "../../components/task/TaskComment.vue";
import TaskPriorityIcon from "../../components/task/TaskPriorityIcon.vue";
import UserAutocomplete from "../project/UserAutocomplete.vue";
import { Close, CollectionTag } from "@element-plus/icons-vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDivider, ElNotification } from 'element-plus'

import firebaseApp from "../../firebase.js";
import { collection, getFirestore, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const divider = h(ElDivider);

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
  task: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  isEditing: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const form = ref();
const rules = ref({
  title: [
    { required: true, message: 'Title cannot be empty' },
  ],
  date: [
    { required: true, message: 'Due date cannot be empty' },
  ],
});

const priorities = ['Urgent', 'Priority', 'Normal'];
const comments = ref([]);

// Task details
const tagInput = ref("");

const model = ref({
  title: props.task.Title ?? "",
  description: props.task.Description ?? "",
  date: props.task["Due Date"] ?? null,
  tags: props.task.Tags ? [...props.task.Tags] : [],
  members: props.task.Members ? [...props.task.Members] : [],
  priority: props.task.Priority ?? priorities[0],
  comments: [],
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

function removeLastTag(event) {
  if (event.target.value.length === 0) {
    this.removeTag(model.value.tags.length - 1);
  }
}

function removeTag(index) {
  model.value.tags.splice(index, 1);
}

function handlePriorityChange(priority) {
  model.value.priority = priority;
}

async function submit() {
  return await form.value.validate(async (valid, fields) => {
    if (!valid) {
      return false;
    }

    const title = model.value.title;
    const description = model.value.description;
    const date = model.value.date;
    const priority = model.value.priority;
    const tags = model.value.tags;
    const members = model.value.members;

    if (!props.isEditing) {
      await addDoc(collection(db, "Tasks"), {
        Name: title,
        Description: description,
        "Due Date": date,
        Label: priority,
        Status: "New",
        Tags: tags,
        Project: doc(db, "Project", props.projectId),
        Members: members.map((member) => member.ref),
      });
       ElNotification({
        title: 'Task created',
        message: `Task "${title}" has been created`,
      })
    } else {
      await updateDoc(doc(db, 'Tasks', props.task.Id), {
        Name: title,
        Description: description,
        "Due Date": date,
        Tags: tags,
        Label: priority,
        Members: members.map((member) => member.ref),
      });
      ElNotification({
        title: 'Task updated',
        message: `Task "${title}" has been updated`,
      })
    }

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