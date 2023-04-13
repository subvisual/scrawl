<script lang="ts">
	import { api } from '$lib/api';
	import { goto, invalidate, afterNavigate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import CmdIcon from './icons/CmdIcon.svelte';
	import ButtonWithKey from './ButtonWithKey.svelte';
	import { routes } from '$lib/routes';
	import { browser } from '$app/environment';

	export let note: Partial<NoteType>;

	let local: Partial<NoteType>;

	function initState(note: Partial<NoteType>) {
		local = {
			name: note?.name || 'Untitled',
			content: note?.content || 'Nothing yet',
			slug: note?.slug,
			tags: note?.tags,
			folder: note?.folder
		};
	}

	$: console.log(note);

	afterNavigate(() => {
		if (note) initState(note);
	});
	onMount(() => {
		if (note) initState(note);

		if (browser) document.addEventListener('keydown', handleKeyDown);
	});
	onDestroy(() => {
		if (browser) document.removeEventListener('keydown', handleKeyDown);
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 's' && event.ctrlKey) {
			event.preventDefault();
			saveChanges();

			return;
		}
	}

	function changed(original: string, local: string) {
		if (!note) return false;

		console.log(`Check; ${original}, ${local}`);

		return original !== local;
	}

	function hasChanges(original: Partial<NoteType>, local: Partial<NoteType>) {
		if (!original) return false;

		console.log('run');

		let a = Object.entries<[string, keyof NoteType]>(original);

		return Object.entries(original).reduce(
			(prev, [key]) =>
				prev || changed(original[key], local?.[key]),
			false
		);
	}

	$: hasUnsavedChanges = hasChanges(local, note);

	async function saveChanges() {
		//if (!hasChanges()) return;

		const op = await api.put<{ id: string; slug: string }>('/api/note', {
			id: note.id,
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

		invalidate(`note:${note.slug}`);
	}
</script>

<div>
	{#if local}
		{hasUnsavedChanges ? 'unsaved' : 'saved'}
		<section class="relative py-12 px-8 max-w-5xl mx-auto">
			<div class="mb-8">
				<input
					type="text"
					class="text-4xl font-bold w-full edible"
					bind:value={local.name}
				/>
			</div>
			<div>
				<textarea
					rows="30"
					class="w-full max-h-full edible"
					bind:value={local.content}
				/>
			</div>

			<div
				class="absolute left-0 right-0 bottom-20 m-auto bg-surface-700 shadow-xl w-fit rounded-container-token px-4 py-4 flex items-stretch justify-center gap-4"
			>
				<ButtonWithKey
					text="Save"
					key="S"
					icon={CmdIcon}
					variant="variant-ghost-secondary"
					on:click={saveChanges}
				/>
				<ButtonWithKey
					text="New note"
					key="N"
					variant="variant-soft-secondary"
					href={routes.newNote}
				/>
				<ButtonWithKey
					text="Options"
					key="K"
					icon={CmdIcon}
					variant="variant-soft-secondary"
				/>
			</div>
		</section>

		<style>
			.edible:focus {
				outline: none;
			}
		</style>
	{/if}
</div>
