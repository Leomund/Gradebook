<template>
<v-dialog v-model="show"
		  persistent
		  width="400">
	<v-card>
		<v-card-title>
			<span class="headline">Edit activity</span>
		</v-card-title>
		<v-card-text>
			<v-text-field label="Name"
						  required
						  v-model="activity.name"></v-text-field>
			<v-menu lazy
					:close-on-content-click="false"
					v-model="menu"
					transition="scale-transition"
					offset-y
					:nudge-left="40"
					full-width
					max-width="290px">
				<v-text-field v-model="activity.date"
							  slot="activator"
							  label="Date"
							  required
							  readonly></v-text-field>
				<v-date-picker v-model="activity.date"
							   no-title
							   scrollable
							   actions>
					<template scope="{save, cancel}">
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn flat
								   primary
								   @click.native="cancel()">Cancel</v-btn>
							<v-btn flat
								   primary
								   @click.native="save()">Save</v-btn>
						</v-card-actions>
					</template>
				</v-date-picker>
			</v-menu>

			<v-text-field label="Group"
						  required
						  v-model="activity.group"></v-text-field>
			<v-text-field label="Subject"
						  v-model="activity.subject"></v-text-field>
			<v-text-field label="Description"
						  multi-line
						  v-model="activity.description"></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1"
				   flat
				   @click.native="cancel">Cancel</v-btn>
			<v-btn class="blue--text darken-1"
				   flat
				   @click.native="confirm">Save</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script>
export default {
	name: 'edit-activity-dialog',
	props: ['show', 'activity'],
	data() {
		return {
			hidePassword: true,
			menu: false,
		}
	},
	methods: {
		cancel() {
			this.$emit('cancel')
		},

		confirm() {
			this.$emit('confirm', this.activity)
		}
	}
}
</script>
