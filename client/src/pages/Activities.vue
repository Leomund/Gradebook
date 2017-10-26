<template>
<div>
	<activities-table :activities="activities" :date.sync="date" @addActivity="showAddActivityDialog = true" @removeActivity="removeActivityDialog" @showDetails="activityDetailsDialog" @editActivity="editActivityDialog"></activities-table>

	<add-activity-dialog :show="showAddActivityDialog" @cancel="showAddActivityDialog = false" @confirm="addActivity"></add-activity-dialog>
	<remove-activity-dialog :show="showRemoveActivityDialog" :activity="currentActivity" @confirm="removeActivity" @cancel="showRemoveActivityDialog = false"></remove-activity-dialog>
	<activity-details-dialog :show="showActivityDetailsDialog" :activity="currentActivity" @cancel="showActivityDetailsDialog = false"></activity-details-dialog>
	<edit-activity-dialog :show="showEditActivityDialog" :activity="currentActivity" @confirm="editActivity" @cancel="showEditActivityDialog = false"></edit-activity-dialog>
</div>
</template>

<script>
import ActivitiesTable from '../components/activities/ActivitiesTable.vue'
import AddActivityDialog from '../components/activities/AddActivityDialog.vue'
import RemoveActivityDialog from '../components/activities/RemoveActivityDialog.vue'
import EditActivityDialog from '../components/activities/EditActivityDialog.vue'
import ActivityDetailsDialog from '../components/activities/ActivityDetailsDialog.vue'

export default {
	components: {
		ActivitiesTable,
		AddActivityDialog,
		RemoveActivityDialog,
		EditActivityDialog,
		ActivityDetailsDialog

	},
	data() {
		return {
			activities: [],
			showAddActivityDialog: false,
			showRemoveActivityDialog: false,
			showEditActivityDialog: false,
			showActivityDetailsDialog: false,
			currentActivity: {},
			date: this.$moment()
		}
	},
	methods: {
		removeActivityDialog(activity) {
			this.currentActivity = activity
			this.showRemoveActivityDialog = true
		},

		editActivityDialog(activity) {
			activity.date = this.$moment(activity.date).format('YYYY-MM-DD')
			this.currentActivity = activity
			this.showEditActivityDialog = true
		},

		activityDetailsDialog(activity) {
			this.currentActivity = activity
			this.showActivityDetailsDialog = true
		},

		removeActivity(id) {
			this.showRemoveActivityDialog = false
			this.axios.delete('/api/activity/' + id)
				.then(res => this.$emit('toast', {
					message: 'done'
				}))
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})

			this.activities = this.activities.filter(activity => activity._id != id)
		},

		editActivity(activity) {
			this.showEditActivityDialog = false
			this.axios.put('/api/activity/' + activity._id, activity)
				.then(res => this.$emit('toast', {
					message: 'done'
				}))
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		addActivity(newActivity) {
			this.showAddActivityDialog = false
			this.axios.post('/api/activity', newActivity)
				.then(res => {
					let inCurrentMonth = res.data.date >= this.$moment(this.date).startOf('month').format() &&
						res.data.date <= this.$moment(this.date).endOf('month').format()
					if (inCurrentMonth) {

						this.activities.push(res.data)
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		loadActivities(date) {
			this.axios.get('/api/activities', {
					params: {
						$gte: this.$moment(date).startOf('month').format(),
						$lte: this.$moment(date).endOf('month').format()
					}
				})
				.then(res => {
					if (Array.isArray(res.data)) {
						this.activities = res.data
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		}
	},

	created() {
		this.loadActivities(this.date)
	},

	watch: {
		date() {
			this.loadActivities(this.date)
		}
	}
}
</script>
