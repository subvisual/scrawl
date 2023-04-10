<script lang="ts">
	import { enhance } from '$app/forms';
	import { ROUTES } from '$lib/routes';
	import type { ActionData, LayoutData } from './$types';

	export let data: LayoutData;
	export let form: ActionData;

	let notes = data?.notes || [];
	let folders = data?.folders || [];
</script>

<h1>Scrawl</h1>
<a href="/new">New note</a>

<h2>Notes</h2>
<div>
	{#each notes as note}
		<p>
			<a href={ROUTES.note(note.slug)}>{note.name}</a>
		</p>
	{/each}
</div>

<h2>Folders</h2>
<div>
	{#each folders as folder}
		<p>
			<a href={ROUTES.folder(folder.slug)}>{folder.name}</a>
		</p>
	{/each}
</div>

<div>
	<p>New folder</p>
	<form action="?/create_folder" method="post" use:enhance>
		<label>
			Name
			<input type="text" name="name" />
		</label>
		<label>
			Slug
			<input type="text" name="slug" />
		</label>
		<button type="submit">Create</button>
	</form>
	{#if form?.success}
		<p>Done!</p>
	{:else if form?.error}
		<p>{form?.message}</p>
	{/if}
</div>
