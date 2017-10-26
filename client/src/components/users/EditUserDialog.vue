<template>
<v-dialog v-model="show" persistent width="400">
	<v-card>
		<v-card-title>
			<span class="headline">Edit user</span>
		</v-card-title>
		<v-card-text>
			<v-text-field label="Name" required v-model="user.name"></v-text-field>
			<v-text-field label="Email" required v-model="user.email"></v-text-field>
			<v-text-field label="Password" required v-model="user.password" :append-icon="hidePassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidePassword = !hidePassword)" :type="hidePassword ? 'password' : 'text'"></v-text-field>
			<v-select label="Role" required :items="['admin', 'teacher', 'student']" v-model="user.role"></v-select>
			<v-text-field v-if="user.role == 'student'" label="Group" v-model="user.group"></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1" flat @click.native="cancel">Cancel</v-btn>
			<v-btn class="blue--text darken-1" flat @click.native="confirm">Edit</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script>
export default {
	name: 'edit-user-dialog',
	props: ['show', 'user'],
	data() {
		return {
			hidePassword: true
		}
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},

		confirm() {
			this.$emit('confirm', this.user)
		}
	}
}
</script>
