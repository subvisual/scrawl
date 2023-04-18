<script lang="ts">
	import { editStore } from '$lib/stores/edit';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import CodeBlockPreview from './CodeBlockPreview.svelte';
	import 'github-markdown-css';
	import 'highlight.js/styles/tokyo-night-dark.css';
</script>

<div class="h-full prose markdown-body py-8 px-12">
	<Markdown md={`# ${$editStore.local.name}`} />
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
