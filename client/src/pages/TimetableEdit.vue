<template>
<div>
	<v-layout row wrap>
		<v-flex xs12 sm6 md4>
			<v-select :items="groups" v-model="group" label="Group" single-line></v-select>
		</v-flex>
		<v-spacer></v-spacer>
		<v-btn flat @click="saveTimetable">Save</v-btn>
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
								<v-text-field label="Activity" v-model="timetable[i-1][j-1]">
								</v-text-field>
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
					this.$emit('toast', {message: 'error: ' + error})
				})
		},
		saveTimetable() {
			if (this.newTimetable) {
				this.axios.post('/api/timetable/', {
						group: this.group,
						timetable: this.timetable
					})
					.then(res => {
						this.$emit('toast', {message: 'done'})
					})
					.catch(error => {
						console.error(error)
						this.$emit('toast', {message: 'error: ' + error})
					})
			} else {
				this.axios.put('/api/timetable/' + this.group, {
						group: this.group,
						timetable: this.timetable
					})
					.then(res => {
						this.$emit('toast', {message: 'done'})
					})
					.catch(error => {
						console.error(error)
						this.$emit('toast', {message: 'error: ' + error})
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
				this.$emit('toast', {message: 'error: ' + error})
			})
		this.group = typeof this.$route.params.group === 'undefined' ? '' : this.$route.params.group
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
				name: 'EditTimetableGroup',
				params: {
					group: this.group
				}
			})
		}
	}
}
</script>

<style scoped>
.list {
	matgin: 64px;
}
</style>
