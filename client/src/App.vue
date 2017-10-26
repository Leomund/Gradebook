<template>
<v-app standalone footer fixed-footer>

	<toolbar></toolbar>

	<main :class="{bg: $route.name == 'Home'}">
		<v-container fluid>
			<router-view @toast="toast"></router-view>
		</v-container>
	</main>

	<v-snackbar :timeout="snackbar.timeout" v-model="snackbar.show">
		{{snackbar.message}}
		<v-btn flat class="primary" @click.native="snackbar.show = false">Close</v-btn>
	</v-snackbar>

	<v-footer v-if="$route.name !== 'Home'" class="pa-3" fixed>
		<v-spacer></v-spacer>
		<div>© {{ $moment().format("YYYY") }}</div>
	</v-footer>

</v-app>
</template>

<script>
import toolbar from './components/Toolbar.vue'

export default {
	name: 'app',
	store: ['user'],
	components: {
		toolbar
	},
	data() {
		return {
			snackbar: {
				show: false,
				timeout: 3000,
				message: ''
			}
		}
	},
	methods: {
		toast(toast) {
			this.snackbar.message = toast.message
			this.snackbar.show = true
		}
	},
	created() {
		if (typeof localStorage.user !== 'undefined') {
			this.user = JSON.parse(localStorage.getItem('user'))
		}
	},
	watch: {
		user() {
			localStorage.setItem('user', JSON.stringify(this.user))
		}
	}
}
</script>

<style lang="stylus">
	@import './stylus/main'
	.bg {
		height: 100%
		background: url('./assets/bg.jpg')
		background-size: cover
	}

</style>
