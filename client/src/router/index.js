import Vue from 'vue'
import store from '../store/store'
import axios from 'axios'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Users from '@/pages/Users'
import Login from '@/pages/Login'
import Activities from '@/pages/Activities'
import Gradebook from '@/pages/Gradebook'
import Timetable from '@/pages/Timetable'
import TimetableEdit from '@/pages/TimetableEdit'


Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				title: 'Home'
			}
		},
		{
			path: '/users',
			name: 'Users',
			component: Users,
			meta: {
				title: 'Users',
				role: 'admin'
			}
		},
		{
			path: '/activities',
			name: 'Activities',
			component: Activities,
			meta: {
				title: 'Activities',
				role: 'teacher'
			}
		},
		{
			path: '/gradebook',
			name: 'Gradebook',
			component: Gradebook,
			meta: {
				title: 'Gradebook',
				role: 'teacher'
			}
		},
		{
			path: '/timetable/:group',
			name: 'TimetableGroup',
			component: Timetable,
			props: true,
			meta: {
				title: 'Timetable'
			}
		},
		{
			path: '/timetable/',
			name: 'Timetable',
			component: Timetable,
			props: true,
			meta: {
				title: 'Timetable'
			}
		},
		{
			path: '/timetable/edit/:group',
			name: 'EditTimetableGroup',
			component: TimetableEdit,
			props: true,
			meta: {
				title: 'Edit Timetable',
				role: 'admin'
			}
		},
		{
			path: '/timetable/edit/',
			name: 'EditTimetable',
			component: TimetableEdit,
			props: true,
			meta: {
				title: 'Edit Timetable',
				role: 'admin'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'Login'
			}
		},
		{
			path: '*',
			name: 'NotFound'
		}
	]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title + ' | Gradebook'
	if (to.name === 'NotFound') {
		next('/')
	}
	axios.get('/api/authcheck')
		.then(res => {
			if (!res.data.authenticated) {
				store.user = {}
				if (to.meta.role === undefined) {
					next()
				}
			} else {
				let currentRole = JSON.parse(localStorage.user)
					.role
				if (to.meta.role === 'admin' && currentRole === 'admin') {
					next()
				} else if (to.meta.role === 'teacher' && currentRole === 'teacher' || currentRole === 'admin') {
					next()
				} else if (to.meta.role === undefined) {
					next()
				} else {
					next('/')
				}
			}
		})
		.catch(error => console.error(error))
})

export default router
