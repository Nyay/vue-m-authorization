<template>
	<p class="text-h7 w-66 font-weight-thin">
		<span class="font-weight-bold">{{ characteristic }}: </span
		>{{ computedCharacteristicText }}
	</p>
</template>
<script setup lang="ts">
interface IDataDisplayCharacteristicProps {
	characteristic: string;
	text: string | string[] | undefined;
}

const computedCharacteristicText = computed(() => {
	if (!props.text) {
		return 'N/A';
	} else {
		return typeof props.text === 'string' ? props.text : props.text.join(', ');
	}
});

const props = defineProps<IDataDisplayCharacteristicProps>();
</script>
<style scoped></style>
