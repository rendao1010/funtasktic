<template>
  <!-- el-form containing project title, description and members -->
  <el-form
    ref="form"
    :model="model"
    :rules="rules"
    label-position="top"
  >
    <!-- el-form-item containing project title -->
    <el-form-item
      label="Title"
      prop="title"
    >
      <!-- el-input containing project title -->
      <el-input
        v-model="model.title"
        class="w-50 m-2"
        size="large"
        placeholder="e.g. Develop the next generation of web applications"
      />
    </el-form-item>
    <!-- el-form-item containing project description -->
    <el-form-item
      label="Description"
      prop="description"
    >
      <!-- el-input containing project description -->
      <el-input
        v-model="model.description"
        class="w-50 m-2"
        size="large"
        placeholder="e.g., Discuss the project"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </el-form-item>
    <!-- el-form-item containing project members, which is an autocomplete field -->
    <el-form-item
      label="Members"
      prop="members"
    >
      <!-- el-autocomplete containing project members -->
      <user-autocomplete 
        :on-add-user="addMember"
        :search-filter="filterMembers"
      />
    </el-form-item>
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
  </el-form>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import UserAutocomplete from './UserAutocomplete.vue';


  import firebaseApp from '../../firebase.js'
  import { ElSpace, ElButton, ElInput, ElAutocomplete, ElDatePicker, ElForm, ElFormItem, ElNotification } from 'element-plus';
  import { Close } from '@element-plus/icons-vue';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import { getUser } from '../../utils/user.js';
  import { getUsers } from '../../utils/firebase/user.js';
  import { useRouter } from 'vue-router';

  const db = getFirestore(firebaseApp);
  const user = getUser();
  const router = useRouter();

  const form = ref(null);
  const model = ref({
    title: '',
    description: '',
    members: [],
  });
  const rules = {
    title: [
      { required: true, message: 'Title cannot be empty' },
    ],
    description: [
      { required: true, message: 'Description cannot be empty' },
    ],
  };

  const memberSelection = ref(null);
  const myUserRef = ref(null);
  const users = ref([]);

  const filterMembers = (u) => !model.value.members.includes(u) && u.Email !== user.email;

  const addMember = (item) => {
    model.value.members.push(item);
  }

  const removeMember = (index) => {
    model.value.members.splice(index, 1);
  };

  const trySubmit = async () => {
    const isValid = await form.value.validate(async (valid, fields) => {
      return valid;
    });

    if (!isValid) {
      return;
    }

    addDoc(collection(db, 'Project'), {
      Title: model.value.title,
      Description: model.value.description,
      Members: [...model.value.members.map((member) => member.ref), myUserRef.value],
      Leader: myUserRef.value,
    }).then(
      (docRef) => {
        ElNotification.success({
          title: 'Success',
          message: 'Project added successfully',
        });
        router.push("/project/" + docRef.id);
      },
      (error) => {
        ElNotification.error({
          title: 'Error',
          message: error.message,
        });
      }
    );
  };

  // When page loaded
  onMounted(async () => {
    const users = await getUsers();
    myUserRef.value = users.find((u) => u.Email === user.email).ref;
  });

  defineExpose({
    trySubmit
  })
</script>