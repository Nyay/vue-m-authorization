<template>
	<v-form @submit.prevent="submitComment">
		<v-text-field
			v-model="newComment"
			:rules="rules"
			label="Your comment here"
			variant="outlined"
		></v-text-field>
		<v-btn class="mt-1" type="submit"> Submit </v-btn>
	</v-form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(event: 'addComment', commentText: string): void;
}>();

const newComment = ref('');

const rules = [
	(value: string) => {
		if (value) return true;
		return 'You must enter a comment before submitting';
	},
];

const submitComment = () => {
	if (newComment.value) {
		emit('addComment', newComment.value);
		newComment.value = '';
	}
};
</script>

<style scoped lang="scss"></style>
