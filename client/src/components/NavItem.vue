<template>
<v-list-tile :to="to" @click="$emit(event)">
	<v-list-tile-action>
		<v-icon>{{icon}}</v-icon>
	</v-list-tile-action>
	<v-list-tile-content>
		<v-list-tile-title>
			<slot></slot>
		</v-list-tile-title>
	</v-list-tile-content>
</v-list-tile>
</template>

<script>
export default {
	name: 'nav-item',
	props: ['icon', 'to', 'event']
}
</script>
