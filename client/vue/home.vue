<template>
	<div class="col-xs-12">
		<h3>Hello, enter channel from top right input</h3>
	</div>
</template>
<script>
import page from './page'
export default {
	mixins: [page],
	created() {
		document.title = 'Chat'
	}
}
</script>
