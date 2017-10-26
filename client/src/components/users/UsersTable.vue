<template >
<v-card class="table">
	<v-card-title>
		Users
		<v-spacer></v-spacer>
		<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
	</v-card-title>

	<v-data-table :headers="headers" :items="users" :search="search" :rows-per-page-items="[10, 25, 40, { text: 'All', value: -1 }]">

		<template slot="headerCell" scope="props">
			<span v-tooltip:bottom="{'html': props.header.text}">
            {{props.header.text}}
          </span>
		</template>

		<template slot="items" scope="props">
			<td>{{ props.item.name }}</td>
			<td class="text-xs">{{ props.item.email }}</td>
			<td class="text-xs">{{ props.item.role }}</td>
			<td class="text-xs">{{ props.item.group }}</td>
			<td class="text-xs-center">
				<v-btn v-tooltip:top="{html: 'details'}" icon @click.native="$emit('showDetails', props.item)">
					<v-icon>search</v-icon>
				</v-btn>
				<v-btn v-tooltip:top="{html: 'edit'}" icon @click.native="$emit('editUser', props.item)">
					<v-icon>edit</v-icon>
				</v-btn>
				<v-btn v-tooltip:top="{html: 'remove'}" icon @click.native="$emit('removeUser', props.item)">
					<v-icon>delete</v-icon>
				</v-btn>
			</td>
		</template>

	</v-data-table>

	<v-card-text>
		<v-btn absolute dark fab bottom right class="accent" v-tooltip:top="{html: 'add user'}" @click.native.stop="$emit('addUser')">
			<v-icon>add</v-icon>
		</v-btn>
	</v-card-text>
</v-card>
</template>

<script>
export default {
	name: 'users-table',
	props: ['users'],
	data() {
		return {
			headers: [{
					text: 'Name',
					align: 'left',
					value: 'name'
				},
				{
					text: 'Email',
					align: 'left',
					sortable: false,
					value: 'email'
				},
				{
					text: 'Role',
					align: 'left',
					sortable: false,
					value: 'role'
				},
				{
					text: 'Group',
					align: 'left',
					sortable: false,
					value: 'group'
				},
				{
					text: 'actions',
					align: 'center',
					sortable: false,
					value: ''
				}
			],
			search: ''
		}
	}
}
</script>

<style scoped>
	.table {
		margin-bottom: 64px;
	}
</style>
