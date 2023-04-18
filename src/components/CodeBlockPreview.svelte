<script lang="ts">
	import hljs from 'highlight.js';

	export let children: any[];
	export let type = '';
	export let tagName = '';
	export let properties = '';
	export let position = '';
	export let __index = '';

	$: elements = children.map((item) => {
		let lang = item.properties?.class?.replace('language-', '');

		if (!lang || !hljs.getLanguage(lang)) {
			return children?.[0]?.children?.[0]?.value;
		}

		return (
			hljs.highlight(item?.children?.[0]?.value || '', {
				language: lang
			})?.value || ''
		);
	});
</script>

<pre><code>{@html elements}</code></pre>
