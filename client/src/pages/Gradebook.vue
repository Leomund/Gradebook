<template >
<v-card class="table">
	<v-card-title>
		<v-select :items="groups" v-model="group" label="Group" class="pr-2"></v-select>
		<v-select :items="subjects" v-model="subject" label="Subject" class="pr-2"></v-select>

		<v-spacer></v-spacer>
		<v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

	</v-card-title>
	<v-alert info dismissible v-model="alert">
		Please select group and subject
	</v-alert>
	<v-data-table :headers="_headers" :items="_students" :search="search" :rows-per-page-items="[10, 25, 40, { text: 'All', value: -1 }]">

		<template slot="headerCell" scope="props">
			<span v-tooltip:bottom="{'html': props.header.text}">
				{{props.header.text}}
			</span>
		</template>

		<template slot="items" scope="props">
			<td>{{props.item.name}}</td>

			<td class="text-xs-center mark" v-for="activity in _activities" @click.stop="openDialog(getMark(props.item.marks, activity.id),  props.index, activity.id)">
				<!-- {{props.item.marks | mark(activity._id)}} -->
				{{getMark(props.item.marks, activity.id)}}

			</td>

		</template>

	</v-data-table>

	<div class="text-xs-center	mb-4 pb-4">
		<v-btn icon @click.native="date = $moment(date).subtract(1, 'M')">
			<v-icon>keyboard_arrow_left</v-icon>
		</v-btn>
		{{date | moment("YYYY-MM")}}
		<v-btn icon @click.native="date = $moment(date).add(1, 'M')">
			<v-icon>keyboard_arrow_right</v-icon>
		</v-btn>
	</div>

	<v-dialog v-model="dialog" lazy absolute>
		<v-card>
			<v-card-title>
				<div class="headline">Edit mark</div>
			</v-card-title>
			<v-card-text class="py-0">
				<v-text-field label="Edit" v-model="mark.value"></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
				<v-btn class="green--text darken-1" flat="flat" @click.native="saveMark()">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</v-card>
</template>

<script>
export default {
	name: 'gradebook',
	data() {
		return {
			headers: [],
			search: '',
			dialog: false,
			mark: {},
			group: '',
			subject: '',
			groups: [],
			subjects: [],
			students: [],
			activities: [],
			date: this.$moment()
		}
	},
	methods: {
		getMark(marks, id) {
			let mark
			marks.forEach(item => {
				if (item.id == id) {
					mark = item.value
				}
			})
			return mark ? mark : null
		},

		openDialog(value, index, id) {
			this.mark = {
				value,
				index,
				id
			}
			this.dialog = true
		},

		saveMark() {
			// (╯°□°）╯︵ ┻━┻
			this.dialog = false
			if (this.mark.value == null || this.mark.value == '') {
				this._students[this.mark.index].marks.forEach((mark, i, marks) => {
					if (mark.id == this.mark.id) {
						marks.splice(i, 1)
						this.updateUser(this._students[this.mark.index])
					}
				})
			} else if (this._students[this.mark.index].marks.length == 0) {
				this._students[this.mark.index].marks.push({
					value: this.mark.value,
					id: this.mark.id
				})
				this.updateUser(this._students[this.mark.index])
			} else {
				this._students[this.mark.index].marks.forEach((mark, i, marks) => {
					if (mark.id == this.mark.id) {
						marks[i].value = this.mark.value
						this.updateUser(this._students[this.mark.index])
					} else if (i == marks.length - 1) {
						marks.push({
							value: this.mark.value,
							id: this.mark.id
						})
						this.updateUser(this._students[this.mark.index])
					}
				})
			}
		},

		updateUser(user) {
			this.axios.put('/api/user/' + user._id, user)
				.then(res => {})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		getGroups() {
			this.axios.get('/api/groups')
				.then(res => {
					if (Array.isArray(res.data)) {
						this.groups = res.data
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		getSubjects() {
			this.axios.get('/api/subjects')
				.then(res => {
					if (Array.isArray(res.data)) {
						this.subjects = res.data
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		getStudents() {
			this.axios.get('/api/students')
				.then(res => {
					if (Array.isArray(res.data)) {
						this.students = res.data
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

		getActivities(date) {
			this.axios.get('/api/activities', {
					params: {
						$gte: this.$moment(date).startOf('month').format(),
						$lte: this.$moment(date).endOf('month').format()
					}
				})
				.then(res => {
					if (Array.isArray(res.data)) {
						this.activities = res.data
						this.headers = []
						res.data.forEach(item => {
							this.headers.push({
								text: item.name,
								align: 'center',
								sortable: false,
								group: item.group,
								subject: item.subject,
								id: item._id
							})
						})
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},

	},

	computed: {
		_students() {
			return this.students.filter(student => student.group === this.group)
		},
		_activities() {
			return this.headers.filter(activity => activity.group === this.group && activity.subject === this.subject)
		},
		_headers() {
			let result = [{
				text: 'Student',
				align: 'left',
				value: 'name',
				sortable: false
			}]

			result = result.concat(this.headers.filter(activity => activity.group === this.group && activity.subject === this.subject))
			return result
		},
		alert() {
			return this.group === '' || this.subject === ''
		}
	},

	created() {
		this.getGroups()
		this.getSubjects()
		this.getActivities(this.date)
		this.getStudents()
	},

	watch: {
		date() {
			this.getActivities(this.date)
		}
	}
}
</script>

<style scoped>
.mark {
	cursor: pointer;
	transition: background, .3s;
}

.mark:hover {
	background: lightgrey;
}
</style>
