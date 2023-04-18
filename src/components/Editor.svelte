<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';
	import { markdown } from '@codemirror/lang-markdown';
	import { languages } from '@codemirror/language-data';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { editStore } from '$lib/stores/edit';
	import HeaderEditor from './HeaderEditor.svelte';

	export let note: NoteType;

	let editor: EditorView;
	let listener = EditorView.updateListener.of(({ state }) => {
		$editStore.local.content = state.doc.toString();
	});

	function setup() {
		editor.setState(
			EditorState.create({
				doc: $editStore.local.content || '',
				extensions: [
					basicSetup,
					markdown({ codeLanguages: languages }),
					oneDark,
					EditorView.lineWrapping,
					listener
				]
			})
		);
	}

	function createBodyEditor(node: HTMLElement) {
		editor = new EditorView({
			parent: node,
			doc: note.content || ''
		});
	}

	editStore.onReset(setup);
</script>

<article class="h-full flex flex-col bg-[#1c1d20] py-4">
	<HeaderEditor {note} />
	<div use:createBodyEditor class="flex-1" />
</article>

