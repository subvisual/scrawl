<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { api } from '$lib/api';
	import { splitTags } from '$lib/utils/splitTags';
	import type { PageData } from './$types';

	type Note = Extract<PageData['note'], { id: string }>;

	export let data: PageData;

	let folders = data.folders || [];

	let local: Partial<Note> = {
		name: data.note?.name || 'Untitled',
		content: data.note?.content || 'Nothing yet',
		slug: data.note?.slug,
		tags: data.note?.tags,
		folder: data.note?.folder
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

	$: tags = splitTags(local.tags || '');
</script>

{#if data.notFound}
	<p>not found</p>
{:else if data?.note}
	<div>
		<select bind:value={local.folder}>
			<option value="">None</option>
			{#each folders as folder}
				<option value={folder.id}>{folder.name}</option>
			{/each}
		</select>
	</div>

	<div>
		<label>
			tags
			<input type="text" bind:value={local.tags} />
		</label>
	</div>
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
