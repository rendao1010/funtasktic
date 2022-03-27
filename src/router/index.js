import { createRouter, createWebHistory} from 'vue-router'
import AddTask from '../views/AddTask.vue'
import ManageTask from '../views/ManageTask.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Dashboard
    },
    {
        path: '/addtask',
        name: 'Add Task',
        component: AddTask
    },
    {
        path: '/managetask',
        name: 'Manage Task',
        component: ManageTask
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router