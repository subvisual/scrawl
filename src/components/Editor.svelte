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

	function resetEditor() {
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

	function createEditor(node: HTMLElement) {
		editor = new EditorView({
			parent: node,
			doc: note.content || ''
		});
	}

	editStore.onReset(resetEditor);
</script>

<article class="root h-full flex flex-col bg-editor-bg py-4">
	<HeaderEditor {note} />
	<div use:createEditor class="flex-1" />
</article>

<style>
	.root {
		background: var(--color-editor-bg);
		border-right: 1px solid #ffffff33;
	}
</style>
