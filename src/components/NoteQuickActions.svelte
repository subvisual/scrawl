<script lang="ts">
	import ModalWrapper from './Modals/ModalWrapper.svelte';
	import ModalHeader from './Modals/ModalHeader.svelte';
	import ModalBody from './Modals/ModalBody.svelte';
	import Icon from './Icon.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';
	import { routes } from '$lib/routes';
	import NoteIcon from './icons/NoteIcon.svelte';
	import { api } from '$lib/api';
	import { editStore } from '$lib/stores/edit';
	import { goto, invalidate } from '$app/navigation';
	import { modalStore } from '@skeletonlabs/skeleton';
	import SearchAutocomplete from './SearchAutocomplete.svelte';

	async function handleDelete() {
		if (!$editStore.local.id) return;

		const op = await api.delete<number>(`/api/note?id=${$editStore.local.id}`);

		if (op) {
			modalStore.close();
			await invalidate('notes:all');
			goto(routes.home);
		}
	}
</script>

<ModalWrapper>
	<ModalBody>
		<SearchAutocomplete hiddenOnStart />
		<div class="mt-4">
			<hr />
		</div>
		<nav class="list-nav mt-4">
			<ul>
				<li>
					<button
						type="button"
						class="w-full text-left"
						on:click={handleDelete}
					>
						<span class="badge text-red-500">
							<Icon>
								<TrashIcon />
							</Icon>
						</span>
						<span class="flex-auto">Delete note</span>
					</button>
				</li>
				<li>
					<a href={routes.newNote}>
						<span class="badge">
							<Icon>
								<NoteIcon />
							</Icon>
						</span>
						<span class="flex-auto">New note</span>
					</a>
				</li>
			</ul>
		</nav>
	</ModalBody>
</ModalWrapper>
