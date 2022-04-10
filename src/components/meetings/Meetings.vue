<template>
  <typography type="h1">
    Events
  </typography>
  <calendar :meetings="events" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Calendar from './Calendar.vue';

import Typography from '../Typography.vue';

import firebaseApp from '../../firebase';
import { doc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { getUsers, getTasks } from '../../utils/firebase/user';
import { getUser } from '../../utils/user';


const db = getFirestore(firebaseApp);

const events = ref([]);

const getMeetings = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'Meeting'), where("Members", "array-contains", doc(db, "User", getUser().refId))));
  const meetings = querySnapshot.docs;

  return meetings.map(meeting => meeting.data());
}

onMounted(async () => {
  const meetingData = await getMeetings();
  const users = await getUsers();

  const meetings = meetingData.map(meeting => {
    const members = meeting.Members.map(member => {
      return users.find(user => user.ref.id === member.id);
    });

    return {
      name: meeting.Name,
      date: meeting.Date.toDate(),
      members: members,
      type: 'meeting',
    }
  });

  const taskData = await getTasks(users);
  const tasks = taskData.map(task => {

    return {
      name: task.Title,
      date: task["Due Date"],
      members: task.Members,
      type: 'task',
    }
  });

  events.value = [...meetings, ...tasks];
});
</script>