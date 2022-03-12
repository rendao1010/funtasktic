<template>
  <div id="newTasks" :key="`{componentKey}-1`">
      <h2>New Tasks</h2>
      <ul>
        <li v-for="task in newTaskList" :key="task.Title">
            {{ task.Title }}
            <button v-on:click="startTask(task.Title)">Start Task</button>
        </li>
      </ul>
  </div>
  <div id="ongoingTasks" :key="`{componentKey}-2`">
      <h2>Ongoing Tasks</h2>
      <ul>
        <li v-for="task in ongoingTaskList" :key="task.Title">
            {{ task.Title }}
            <button v-on:click="completeTask(task.Title)">Complete Task</button>
        </li>
      </ul>
  </div>
  <div id="completedTasks" :key="`{componentKey}-3`">
      <h2>Completed Tasks</h2>
      <ul>
        <li v-for="task in completedTaskList" :key="task.Title">
            {{ task.Title }}
            <button>Delete Task</button>
        </li>
      </ul>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
const db = getFirestore(firebaseApp)

export default {
    data() {
        return {
            newTaskList: [],
            ongoingTaskList: [],
            completedTaskList: [],
            componentKey: 0
        }
    },

    mounted() {
        this.getNewTasks()
        this.getOngoingTasks()
        this.getCompletedTasks()
    },

    methods: {
        async getNewTasks() {
            var q = query(collection(db, "Tasks"), where("Status", "==", "new"))
            var querySnapshot = await getDocs(q)
            querySnapshot.forEach((document) => this.newTaskList.push(document.data()))
        },

        async getOngoingTasks() {
            var q = query(collection(db, "Tasks"), where("Status", "==", "ongoing"))
            var querySnapshot = await getDocs(q)
            querySnapshot.docs.forEach((document) => this.ongoingTaskList.push(document.data()))
        },

        async getCompletedTasks() {
            var q = query(collection(db, "Tasks"), where("Status", "==", "completed"))
            var querySnapshot = await getDocs(q)
            querySnapshot.forEach((document) => this.completedTaskList.push(document.data()))
        },

        async startTask(taskTitle) {
            var taskRef = doc(db, "Tasks", taskTitle)
            await updateDoc(taskRef, {
                Status: "ongoing"
            })
            this.componentKey += 1
            window.location.reload()
        },

        async completeTask(taskTitle) {
            var taskRef = doc(db, "Tasks", taskTitle)
            await updateDoc(taskRef, {
                Status: "completed"
            })
            this.componentKey += 1
        }
    }
}
</script>

<style>
</style>