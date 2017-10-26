<template>
<v-layout row justify-center>
	<v-dialog v-model="show" persistent>
		<v-card>
			<v-card-title class="headline">Remove user?</v-card-title>
			<v-card-text>Are you shore you want to compleetle delete user <b>{{user.name}}</b>.</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="green--text darken-1" flat="flat" @click.native="$emit('cancel')">Cancel</v-btn>
				<v-btn class="green--text darken-1" flat="flat" @click.native="$emit('confirm', user._id)">Remove</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-layout>
</template>

<script>
export default {
	name: 'remove-user-dialog',
	props: ['show', 'user']
}
</script>
