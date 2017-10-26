<template>
<div>
	<h1 class="text-xs-center gradebook">Gradebook</h1>
	<v-layout>
		<v-flex xs12 sm6 offset-sm3>
			<v-card class="pa-4">
				<v-card-title primary-title>
					<h3 class="headline">Login</h3>
				</v-card-title>
				<v-card-text class="py-4">
					<v-text-field label="Email" required v-model="credentials.email"></v-text-field>
					<v-text-field label="Password" required v-model="credentials.password" :append-icon="hidePassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidePassword = !hidePassword)" :type="hidePassword ? 'password' : 'text'" @keyup.enter="login"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn class="secondary" dark @click="login" >Login
						<v-icon right dark>send</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
			<v-alert error dismissible v-model="alert.show" class="my-4">
				{{alert.text}}
			</v-alert>
		</v-flex>
	</v-layout>

</div>
</template>

<script>
export default {
	store: ['user'],
	data() {
		return {
			hidePassword: true,
			credentials: {},
			alert: {
				show: false,
				text: ''
			}
		}
	},
	methods: {
		login() {
			this.axios.post('/api/login', this.credentials)
				.then((res) => {
					if (res.data.message) {
						this.alert.text = res.data.message
						this.alert.show = true
					} else {
						this.$store.user = res.data
						this.$router.push({
							name: 'Home'
						})
					}
				})
				.catch((error) => {
					this.alert.text = 'Error fetching data'
					this.alert.show = true
				})
		}
	}
}
</script>

<style scoped>
	.gradebook {
		margin-top: 54px;
	}
</style>
