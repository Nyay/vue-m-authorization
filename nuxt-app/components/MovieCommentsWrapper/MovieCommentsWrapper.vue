<template>
	<v-container class="d-flex justify-space-between align-end">
		<p class="text-h5 mt-4 text-left block-title pl-8">User comments</p>
		<v-btn :disabled="!token" @click="commentDisplayToggle">
			{{
				!token
					? 'Sign in to add a comment'
					: isCommentInputDisplayed
						? 'Hide comment input'
						: 'Add a comment'
			}}
		</v-btn>
	</v-container>
	<MovieCommentInput
		v-if="isCommentInputDisplayed"
		@add-comment="submitComment"
	/>
	<v-data-iterator class="pb-10" :items="movieComments" :items-per-page="3">
		<template #default="{ items }">
			<AppContainer
				v-for="item in items"
				:key="item.raw._id"
				class="flex-column"
			>
				<p class="text-h6">{{ item.raw.name }}</p>
				<p class="text-caption font-italic">
					{{ new Date(item.raw.date || '').toLocaleString() }}
				</p>
				<p class="mt-2">{{ item.raw.text }}</p>
			</AppContainer>
		</template>

		<template
			v-if="movieComments.length > 3"
			#footer="{ page, pageCount, prevPage, nextPage }"
		>
			<div class="d-flex align-center justify-center pa-4">
				<v-btn
					:disabled="page === 1"
					density="comfortable"
					icon="mdi-arrow-left"
					variant="tonal"
					rounded
					@click="prevPage"
				/>

				<div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

				<v-btn
					:disabled="page >= pageCount"
					density="comfortable"
					icon="mdi-arrow-right"
					variant="tonal"
					rounded
					@click="nextPage"
				/>
			</div>
		</template>
	</v-data-iterator>
</template>
<script setup lang="ts">
import AppContainer from '~/components/ui/AppContainer/AppContainer.vue';
import type { IMovieComment } from '~/types/movies';
import MovieCommentInput from '~/components/MovieCommentInput/MovieCommentInput.vue';

interface IMovieCommentsWrapperProps {
	movieComments: IMovieComment[] | [];
}

defineProps<IMovieCommentsWrapperProps>();

const emit = defineEmits<{
	(event: 'addComment', commentText: string): void;
}>();

const token = useCookie('auth_token');

const isCommentInputDisplayed = ref(false);

const commentDisplayToggle = () => {
	isCommentInputDisplayed.value = !isCommentInputDisplayed.value;
};

const submitComment = async (commentText: string) => {
	emit('addComment', commentText);
	isCommentInputDisplayed.value = false;
};
</script>
<style scoped lang="scss">
.block-title {
	animation: text-appear 1s ease-in-out;
}

@keyframes text-appear {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
