<template>
  <el-autocomplete
    v-model="userSelection"
    class="w-50 m-2"
    size="large"
    placeholder="Add users..."
    :fetch-suggestions="fetchUsers"
    @select="handleUserSelect"
    @clear="handleUserClear"
  />
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import { ElAutocomplete } from 'element-plus';

  import { getUsers } from '../../utils/firebase/user.js';

  const users = ref([]);
  const userSelection = ref(null);

  const handleUserSelect = (item) => {
    props.onAddUser(item);
    userSelection.value = null;
  };

  const handleUserClear = () => {
    userSelection.value = null;
  };

  const fetchUsers = (queryString, cb) => {
    const results = queryString ? 
        users.value.filter((user) => user['Full Name'].toLowerCase().includes(queryString.toLowerCase()))
      : users.value;
    cb(results.filter(props.searchFilter));
  };

  const props = defineProps({
    searchFilter: {
      type: Function,
      default: () => true,
    },
    onAddUser: {
      type: Function,
      default: () => {},
    },
  });

  onMounted(async () => {
    users.value = await getUsers();
  });
  
</script>