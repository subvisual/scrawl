<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { editStore } from '$lib/stores/edit';

	export let note: NoteType;

	let editor: EditorView;
	let listener = EditorView.updateListener.of(({ state }) => {
		$editStore.local.name = state.doc.toString().substring(2);
	});

	function reset() {
		editor.setState(
			EditorState.create({
				doc: `# ${$editStore.local.name}`,
				extensions: [
					basicSetup,
					markdown(),
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
			doc: `# ${note.name}`
		});
	}

	editStore.onReset(reset);
</script>

<header class="editor-header pb-4" use:createEditor />
