<template>
<div>
	<users-table :users="users" @addUser="showAddUserDialog = true" @removeUser="removeUserDialog" @showDetails="userDetailsDialog" @editUser="editUserDialog"></users-table>

	<add-user-dialog :show="showAddUserDialog" @cancel="showAddUserDialog = false" @confirm="addUser"></add-user-dialog>
	<remove-user-dialog :show="showRemoveUsersDialog" :user="currentUser" @confirm="removeUser" @cancel="showRemoveUsersDialog = false"></remove-user-dialog>
	<user-details-dialog :show="showUserDetailsDialog" :user="currentUser" @cancel="showUserDetailsDialog = false"></user-details-dialog>
	<edit-user-dialog :show="showEditUserDialog" :user="currentUser" @confirm="editUser" @cancel="showEditUserDialog = false"></edit-user-dialog>
</div>
</template>

<script>
import UsersTable from '../components/users/UsersTable.vue'
import AddUserDialog from '../components/users/AddUserDialog.vue'
import RemoveUserDialog from '../components/users/RemoveUserDialog.vue'
import EditUserDialog from '../components/users/EditUserDialog.vue'
import UserDetailsDialog from '../components/users/UserDetailsDialog.vue'

export default {
	components: {
		UsersTable,
		AddUserDialog,
		RemoveUserDialog,
		EditUserDialog,
		UserDetailsDialog

	},
	data() {
		return {
			users: [],
			showAddUserDialog: false,
			showRemoveUsersDialog: false,
			showEditUserDialog: false,
			showUserDetailsDialog: false,
			currentUser: {},
		}
	},
	methods: {
		removeUserDialog(user) {
			this.currentUser = user
			this.showRemoveUsersDialog = true
		},

		editUserDialog(user) {
			this.currentUser = user
			this.showEditUserDialog = true
		},

		userDetailsDialog(user) {
			this.currentUser = user
			this.showUserDetailsDialog = true
		},

		removeUser(id) {
			this.showRemoveUsersDialog = false

			this.axios.delete('/api/user/' + id)
				.then(res => {})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})

			this.users = this.users.filter(user => user._id != id)
		},

		editUser(user) {
			this.showEditUserDialog = false
			this.axios.put('/api/user/' + user._id, user)
				.then(res => {})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		addUser(newUser) {
			this.showAddUserDialog = false
			this.axios.post('/api/user', newUser)
				.then(res => this.users.push(res.data))
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		}
	},
	created() {
		this.axios.get('/api/users')
			.then(res => {
				if (Array.isArray(res.data)) {
					this.users = res.data
				}
			})
			.catch(error => {
				console.error(error)
				this.$emit('toast', {
					message: 'error: ' + error
				})
			})
	}
}
</script>
