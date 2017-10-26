<template>
<v-layout row justify-center>
	<v-dialog v-model="show" persistent>
		<v-card>
			<v-card-title class="headline">Remove activity?</v-card-title>
			<v-card-text>Are you shore you want to compleetle delete user <b>{{activity.name}}</b>.</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="green--text darken-1" flat="flat" @click.native="$emit('cancel')">Cancel</v-btn>
				<v-btn class="green--text darken-1" flat="flat" @click.native="$emit('confirm', activity._id)">Remove</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-layout>
</template>

<script>
//TODO: pass show dialog proop and fix bugs. Do same with add dialog component
//TODO: fix child props mutation e.g. use computed property
export default {
	name: 'remove-activity-dialog',
	props: ['show',	'activity']
}
</script>
