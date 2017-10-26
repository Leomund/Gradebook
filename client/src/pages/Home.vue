<template>
<v-layout column align-center justify-center class="mt">
	<h1 class="white--text">Gradebook</h1>
	<h4 class="white--text">Per aspera ad astra!</h4>
	<div class="mt-4">
		<v-btn light large raised class="pr-3" to="/timetable">
			<v-icon dark left>date_range</v-icon>
			timetable
		</v-btn>
		<v-btn v-if="!user.name" dark large raised primary class="pl-3" to="/login">
			login
			<v-icon dark right>keyboard_arrow_right</v-icon>
		</v-btn>
		<v-btn v-if="user.role == 'student'" light large raised class="pl-3" to="/diary">
			diary
			<v-icon dark right>book</v-icon>
		</v-btn>
		<v-btn v-if="user.role == 'teacher'" light large raised  class="pl-3" to="/gradebook">
			gradebook
			<v-icon dark right>book</v-icon>
		</v-btn>
		<v-btn v-if="user.role == 'admin'" light large raised  class="pl-3" to="/users">
			users
			<v-icon dark right>group</v-icon>
		</v-btn>
	</div>
</v-layout>
</template>

<script>
export default {
	name: 'hello',
	store: ['user']
}
</script>

<style scoped lang="css">
	.mt {
		margin-top: 120px;

	}

	.white--text {
		text-shadow: 2px 1px 10px rgba(0,0,0,0.7);
	}
</style>
