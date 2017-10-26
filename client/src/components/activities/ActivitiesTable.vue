<template >
<v-card class="table">
	<v-card-title>
		<v-select v-bind:items="groups" v-model="group" label="Group" class="pr-2"></v-select>
		<v-select v-bind:items="subjects" v-model="subject" label="Subject" class="pr-2"></v-select>

		<v-spacer></v-spacer>
		<v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
	</v-card-title>

	<v-data-table :headers="headers" :items="_activities" :search="search" :rows-per-page-items="[10, 25, 40, { text: 'All', value: -1 }]">

		<template slot="headerCell" scope="props">
			<span v-tooltip:bottom="{'html': props.header.text}">
				{{props.header.text}}
			</span>
		</template>

		<template slot="items" scope="props">
			<td>{{props.item.name}}</td>
			<td class="text-xs">{{props.item.date | moment('YYYY-MM-DD')}}</td>
			<td class="text-xs">{{props.item.group}}</td>
			<td class="text-xs">{{props.item.subject}}</td>
			<td class="text-xs">{{props.item.description}}</td>
			<td class="text-xs-center">
				<v-btn v-tooltip:top="{html: 'details'}" icon @click.native="$emit('showDetails', props.item)">
					<v-icon>search</v-icon>
				</v-btn>
				<v-btn v-tooltip:top="{html: 'edit'}" icon @click.native="$emit('editActivity', props.item)">
					<v-icon>edit</v-icon>
				</v-btn>
				<v-btn v-tooltip:top="{html: 'remove'}" icon @click.native="$emit('removeActivity', props.item)">
					<v-icon>delete</v-icon>
				</v-btn>
			</td>
		</template>

	</v-data-table>

	<div class="text-xs-center	">
		<v-btn icon @click.native="$emit('update:date', $moment(date).subtract(1, 'M'))">
			<v-icon>keyboard_arrow_left</v-icon>
		</v-btn>
		{{date | moment("YYYY-MM")}}
		<v-btn icon @click.native="$emit('update:date', $moment(date).add(1, 'M'))">
			<v-icon>keyboard_arrow_right</v-icon>
		</v-btn>
	</div>

	<v-card-text>
		<v-btn absolute dark fab bottom right class="accent" v-tooltip:top="{html: 'add activity'}" @click.native.stop="$emit('addActivity')">
			<v-icon>add</v-icon>
		</v-btn>
	</v-card-text>
</v-card>
</template>

<script>
export default {
	name: 'activities-table',
	props: ['activities', 'date'],
	data() {
		return {
			headers: [{
					text: 'Name',
					align: 'left',
					value: 'name',
					sortable: false
				},
				{
					text: 'date',
					align: 'left',
					value: 'date'
				},
				{
					text: 'group',
					align: 'left',
					sortable: false,
					value: 'group'
				},
				{
					text: 'subject',
					align: 'left',
					sortable: false,
					value: 'subject'
				},
				{
					text: 'description',
					align: 'left',
					sortable: false,
					value: 'description'
				},
				{
					text: 'actions',
					align: 'center',
					sortable: false,
					value: ''
				}
			],
			search: '',
			group: 'all',
			subject: 'all',
			groups: [],
			subjects: []
		}
	},
	methods: {
		getGroups() {
			this.axios.get('/api/groups')
				.then(res => {
					if (Array.isArray(res.data)) {
						this.groups = ['all']
						this.groups = this.groups.concat(res.data)
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
						this.subjects = ['all']
						this.subjects = this.subjects.concat(res.data)
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
	computed: {
		_activities() {
			if (this.group == 'all' && this.subject === 'all') {
				return this.activities
			}
			if (this.group == 'all') {
				return this.activities.filter(activity => activity.subject === this.subject)
			}
			if (this.subject == 'all') {
				return this.activities.filter(activity => activity.group === this.group)

			} else {
				return this.activities.filter(activity => activity.group === this.group && activity.subject === this.subject)
			}
		}
	},
	created() {
		this.getGroups()
		this.getSubjects()
	}
}
</script>

<style scoped>
.table {
	margin-bottom: 64px;
}
</style>
