import { createRouter, createWebHistory} from 'vue-router'
import AddTask from '../views/AddTask.vue'
import ManageTask from '../views/ManageTask.vue'

const routes = [
    {
        path: '/addtask',
        name: 'AddTask',
        component: AddTask
    },
    {
        path: '/managetask',
        name: 'ManageTask',
        component: ManageTask
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router