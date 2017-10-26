<template>
<div>
	<v-layout row wrap>
		<v-flex xs12 sm6 md4>
			<v-select :items="groups" v-model="group" label="Group" single-line></v-select>
		</v-flex>
		<v-spacer></v-spacer>
		<v-btn v-if="user.role === 'admin'" flat @click="editTimetable">Edit</v-btn>
	</v-layout>

	<v-alert info dismissible v-model="alert">
		Please select group
	</v-alert>

	<v-layout row wrap v-if="loaded">
		<v-flex xs12 sm6 md4 v-for="i in 6" :key="i">
			<v-card class="my-1 mx-1">
				<v-list two-line>
					<v-subheader>{{days[i]}}</v-subheader>
					<template v-for="j in 6">
						<v-divider></v-divider>
						<v-list-tile>
							<v-list-tile-content>
								{{j}}. {{timetable[i-1][j-1]}}
							</v-list-tile-content>
						</v-list-tile>

					</template>
				</v-list>
			</v-card>

		</v-flex>
	</v-layout>
</div>
</template>

<script>
export default {
	store: ['user'],
	data() {
		return {
			group: '',
			groups: [],
			loaded: false,
			newTimetable: false,
			timetable: [],
			days: this.$moment()._locale._weekdays
		}
	},
	methods: {
		getTimetable() {
			this.axios.get('/api/timetable/' + this.group)
				.then(res => {
					if (res.data) {
						this.timetable = res.data.timetable
					} else {
						this.newTimetable = true
						this.timetable = []
					}
					this.loaded = true
					while (this.timetable.length < 7) {
						this.timetable.push([])
					}
				})
				.catch(error => {
					console.error(error)
					this.$emit('toast', {
						message: 'error: ' + error
					})
				})
		},
		editTimetable() {
			if (this.group === '') {
				this.$router.push({
					name: 'EditTimetable'
				})
			} else {
				this.$router.push({
					name: 'EditTimetableGroup',
					params: {
						owner: this.owner
					}
				})
			}
		}

	},
	created() {
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
		this.group = this.$route.params.group == undefined ? '' : this.$route.params.group
	},
	computed: {
		alert() {
			return this.group === ''
		}
	},
	watch: {
		group() {
			this.getTimetable()
			this.$router.push({
				name: 'TimetableGroup',
				params: {
					group: this.group
				}
			})
		}
	}
}
</script>

<style scoped>
</style>
