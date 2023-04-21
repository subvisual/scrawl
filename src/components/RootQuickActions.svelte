<script lang="ts">
	import ModalBody from './Modals/ModalBody.svelte';
	import ModalHeader from './Modals/ModalHeader.svelte';

	import ModalWrapper from './Modals/ModalWrapper.svelte';
	import SearchAutocomplete from './SearchAutocomplete.svelte';
</script>

<ModalWrapper>
	<ModalHeader slot="header">Search notes</ModalHeader>
	<ModalBody>
		<SearchAutocomplete />
		<div class="h-10" />
	</ModalBody>
</ModalWrapper>
