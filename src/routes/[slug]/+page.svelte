<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { api } from '$lib/api';
	import type { PageData } from './$types';

	type Note = Extract<PageData['note'], { id: string }>;

	export let data: PageData;

	let local: Partial<Note> = {
		name: data.note?.name || 'Untitled',
		content: data.note?.content || 'Nothing yet',
		slug: data.note?.slug
	};

	function changed(field: keyof Note) {
		if (!data.note) return false;

		return data.note?.[field] !== local[field];
	}

	async function saveChanges() {
		const op = await api.put<{ id: string; slug: string }>('/api/note', {
			id: data.id,
			...local
		});

		if (!op) {
			// handle error
			return;
		}

		if (changed('slug')) {
			await invalidate('notes:all');
			goto(`/${local.slug}`, {
				replaceState: true
			});
		} else if (changed('name')) {
			invalidate('notes:all');
		}
	}
</script>

{#if data.notFound}
	<p>not found</p>
{:else if data?.note}
	<div>
		<label>
			slug
			<input type="text" bind:value={local.slug} />
		</label>
	</div>
	<div>
		<slug>
			title
			<input type="text" bind:value={local.name} />
		</slug>
	</div>
	<div>
		<textarea bind:value={local.content} rows="10" />
	</div>
	<div>
		<button on:click={saveChanges}>Save</button>
	</div>
{/if}
