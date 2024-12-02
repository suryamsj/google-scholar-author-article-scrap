<script>
	let { children } = $props();
	import '../app.css';
</script>

<main class="flex-shrink-0">
	{@render children()}
</main>
