<template>
  <div id="newTasks">
      <h2>New Tasks</h2>
      <ul>
        <li v-for="task in newTaskList" :key="task">
            {{ task.Title }}
            <ul class="tags">
                <li v-for="tag in task.Tags" :key="tag" class="tag">
                    {{ tag }}
                </li>
            </ul>
            <button v-on:click="startTask(task.Title)">Start Task</button>
        </li>
      </ul>
  </div>
  <div id="ongoingTasks">
      <h2>Ongoing Tasks</h2>
      <ul>
        <li v-for="task in ongoingTaskList" :key="task">
            {{ task.Title }}
            <ul class="tags">
                <li v-for="tag in task.Tags" :key="tag" class="tag">
                    {{ tag }}
                </li>
            </ul>
            <button v-on:click="completeTask(task.Title)">Complete Task</button>
        </li>
      </ul>
  </div>
  <div id="completedTasks">
      <h2>Completed Tasks</h2>
      <ul>
        <li v-for="task in completedTaskList" :key="task">
            {{ task.Title }}
            <ul class="tags">
                <li v-for="tag in task.Tags" :key="tag" class="tag">
                    {{ tag }}
                </li>
            </ul>
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
            window.location.reload()
        },

        async completeTask(taskTitle) {
            var taskRef = doc(db, "Tasks", taskTitle)
            await updateDoc(taskRef, {
                Status: "completed"
            })
            window.location.reload()
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    padding: 0
}

.tag {
    background: rgb(250, 104, 104);
    padding: 5px;
    border-radius: 4px;
    color: white;
    white-space: nowrap;
    transition: 0.1s ease background
}
</style>