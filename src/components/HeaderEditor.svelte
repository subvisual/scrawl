<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { keymap } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { markdown } from '@codemirror/lang-markdown';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { editStore } from '$lib/stores/edit';

	export let note: NoteType;

	let editor: EditorView;

	const preventDeleteFirstTwoChars = keymap.of([
		{
			key: 'Backspace',
			run: (target) => {
				const { from, to } = target.state.selection.main;

				if (to <= 2) {
					return true; // Prevent deletion
				}

				return false;
			}
		}
	]);

	let listener = EditorView.updateListener.of(({ state }) => {
		$editStore.local.title = state.doc.toString().substring(2);
	});

	function reset() {
		editor.setState(
			EditorState.create({
				doc: `# ${$editStore.local.title}`,
				extensions: [
					preventDeleteFirstTwoChars,
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
			doc: `# ${note.title}`
		});
	}

	editStore.onReset(reset);
</script>

<header class="editor-header pb-4" use:createEditor />
