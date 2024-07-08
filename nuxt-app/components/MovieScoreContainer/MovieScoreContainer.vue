<template>
	<v-col cols="12" sm="4">
		<v-container>
			<p class="text-h5 text-left block-title">{{ title }}</p>
			<AppContainerSmall class="flex-column pa-5">
				<Characteristic
					v-for="(line, index) in characteristics"
					:key="index"
					:characteristic="line.name"
					:text="line.value.toString()"
				/>
			</AppContainerSmall>
		</v-container>
	</v-col>
</template>

<script setup lang="ts">
import AppContainerSmall from '~/components/ui/AppContainerSmall/AppContainerSmall.vue';

interface IScoreCharacteristic {
	name: string;
	value: string | number;
}

interface IMovieScoreContainerProps {
	title: string;
	characteristics: IScoreCharacteristic[];
}

defineProps<IMovieScoreContainerProps>();
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
