import { Editor } from '@tiptap/core';
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import tippy, { Instance } from 'tippy.js';
import { MentionList } from './MentionList';
import { BlockId } from './BlockId';
import { usePage_UpdateMutation } from '../../generated/graphql';
import { useEffect } from 'react';

const Tiptap = ({ id, content }: { id: string; content: string | null }) => {
  const initialContent: string = content ? JSON.parse(content) : 'Hello World!';

  const editor = useEditor({
    extensions: [
      StarterKit,
      BlockId,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          items: (query) => {
            return [
              'Lea Thompson',
              'Cyndi Lauper',
              'Tom Cruise',
              'Madonna',
              'Jerry Hall',
              'Joan Collins',
              'Winona Ryder',
              'Christina Applegate',
              'Alyssa Milano',
              'Molly Ringwald',
              'Ally Sheedy',
              'Debbie Harry',
              'Olivia Newton-John',
              'Elton John',
              'Michael J. Fox',
              'Axl Rose',
              'Emilio Estevez',
              'Ralph Macchio',
              'Rob Lowe',
              'Jennifer Grey',
              'Mickey Rourke',
              'John Cusack',
              'Matthew Broderick',
              'Justine Bateman',
              'Lisa Bonet',
            ]
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase()),
              )
              .slice(0, 5);
          },
          render: () => {
            let reactRenderer: ReactRenderer;
            let popup: [Instance];

            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(MentionList, {
                  props,
                  //@ts-ignore Directly from example
                  editor: props.editor,
                });

                //@ts-ignore
                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });
                console.log(popup);
              },
              onUpdate(props) {
                reactRenderer.updateProps(props);
                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props) {
                if (props.event.key === 'Escape') {
                  popup[0].hide();

                  return true;
                }
                //@ts-ignore Part of Example
                return reactRenderer.ref?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                reactRenderer.destroy();
              },
            };
          },
        },
      }),
    ],
    content: initialContent,
  });

  const json = editor?.getJSON();
  const editorContent = JSON.stringify(json);

  const [updatePageMutation, { loading, error, data }] =
    usePage_UpdateMutation();

  const defaultContent =
    '{"type":"doc","content":[{"type":"paragraph","attrs":{"blockId":null}}]}';
  useEffect(() => {
    if (
      id &&
      editorContent &&
      editorContent !== JSON.stringify(initialContent) &&
      editorContent !== JSON.stringify(defaultContent)
    ) {
      updatePageMutation({ variables: { id: id, content: editorContent } });
      console.warn('UPDATE DATA', { id, editorContent });
    }
  }, [id, editorContent, updatePageMutation]);

  console.log('Page Content:', { editorContent, data });

  return (
    <div key={id}>
      <MenuBar editor={editor} />
      <div className="text-white text-text-opacity-h-emp">
        <EditorContent key={id} editor={editor} />
      </div>
      <div className="mt-20 text-white text-text-opacity-l-emp">
        Editor JSON Output
        <pre className="text-xs">{JSON.stringify(json, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Tiptap;

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="text-white editor-menu">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive('strike')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={
          editor.isActive('code')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive('paragraph')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive('heading', { level: 4 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive('heading', { level: 5 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive('heading', { level: 6 })
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive('codeBlock')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive('blockquote')
            ? 'is-active !text-gray-800 !bg-purple-400'
            : ''
        }
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>redo</button>
    </div>
  );
};
