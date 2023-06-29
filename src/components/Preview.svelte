<script lang="ts">
	import 'github-markdown-css/github-markdown-dark.css';
	import 'highlight.js/styles/tokyo-night-dark.css';
	import { editStore } from '$lib/stores/edit';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import CodeBlockPreview from './CodeBlockPreview.svelte';
</script>

<div class="h-full prose markdown-body py-8 px-12 max-w-3xl mx-auto">
	<Markdown md={`# ${$editStore.local.title}`} />
	<Markdown
		md={$editStore.local.content || ''}
		plugins={[
			gfmPlugin,
			{
				renderer: {
					pre: CodeBlockPreview
				}
			}
		]}
	/>
</div>
