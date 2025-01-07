<template>
    <h1>Hello!</h1>
</template>
<script lang="ts" setup>
import { getMovieList } from '~/services/moviesDataService';
onMounted(async () => {
	await getMovieList( { minYear: 1998 } );
});
</script>
<style scoped lang="scss"></style>
