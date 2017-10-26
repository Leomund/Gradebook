<template>
<div>
	<v-navigation-drawer temporary v-model="drawer" overflow absolute clipped>

		<v-list class="pa-0" v-if="user.name">
			<v-list-tile avatar >
				<v-list-tile-avatar>
					<img src="http://i.pravatar.cc/100" />
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title>{{user.name}}</v-list-tile-title>
					<v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

		<v-list class="pt-0" dense>
			<v-divider light></v-divider>
			<v-list-tile to="/" exact>
				<v-list-tile-action>
					<v-icon>dashboard</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>
						Home
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<nav-item to="/timetable" icon="date_range">Timetable</nav-item>
			<nav-item v-if="user.role == 'admin'" to="/users" icon="list">Users</nav-item>
			<nav-item v-if="user.role == 'admin' || user.role == 'teacher'" to="/activities" icon="view_list">Activities</nav-item>
			<nav-item v-if="user.role == 'admin' || user.role == 'teacher'" to="/gradebook" icon="book">Gradebook</nav-item>
			<nav-item v-if="user.role == 'student'" to="/diary" icon="book">Diary</nav-item>
			<v-divider light></v-divider>
			<nav-item v-if="user.name" icon="exit_to_app" @logout="logout" event="logout">Logout</nav-item>
			<nav-item v-if="!user.name" to="/login" icon="exit_to_app">Login</nav-item>

		</v-list>

	</v-navigation-drawer>

	<v-toolbar :class="{primary: true, transparent: $route.name == 'Home', 'elevation-0': $route.name == 'Home'}" dark :fixed="$route.name == 'Home'">
		<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

		<v-toolbar-title class="ml-0">
			<v-btn flat to="/" active-class>Gradebook</v-btn>
		</v-toolbar-title>
		<v-spacer></v-spacer>

		<v-toolbar-items>
			<v-btn dark flat disabled v-if="user.role">{{user.role}}</v-btn>
			<v-btn dark flat v-if="!user.name" to="/login">Login</v-btn>
			<v-btn dark flat @click="logout" v-if="user.name">Logout</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</div>
</template>

<script>
import NavItem from './NavItem.vue'

export default {
	name: 'toolbar',
	store: ['user'],
	components: {
		NavItem
	},
	data() {
		return {
			drawer: false
		}
	},
	methods: {
		logout() {
			this.drawer = false
			this.axios.get('/api/logout')
				.catch(err => console.error(err))
			this.user = {}
			this.$router.push({
				name: 'Home'
			})
		}
	}
}
</script>
