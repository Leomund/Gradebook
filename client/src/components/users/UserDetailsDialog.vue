<template>
<v-layout row justify-center>
	<v-dialog v-model="show" persistent width="600">
		<v-card>
			<v-card-title class="headline">{{user.name}}</v-card-title>
			<v-card-text>
				<code class="code">{{JSON.stringify(user, null, 4)}}</code>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="green--text darken-1" flat="flat" @click.native="$emit('cancel')">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-layout>
</template>

<script>
export default {
	name: 'user-details-dialog',
	props: ['show', 'user']
}
</script>

<style scoped>
.code {
	width: 100%
}
</style>
