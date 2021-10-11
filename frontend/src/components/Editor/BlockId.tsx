import { Node } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';

enum Type {
  heading = 'heading',
  paragraph = 'paragraph',
}

const types: Record<string, boolean> = {
  [Type.heading]: true,
  [Type.paragraph]: true,
};

export const BlockId = Node.create({
  name: 'blockId',
  addGlobalAttributes() {
    return [
      {
        types: Object.keys(types),
        attributes: {
          blockId: { default: null, rendered: false, keepOnSplit: false },
        },
      },
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, oldState, newState) => {
          let blockIds: Record<string, boolean> = {};

          console.log(newState.tr);
          if (newState.doc === oldState.doc) {
            return;
          }

          const tr = newState.tr;

          newState.doc.descendants((node, pos, parent) => {
            const existingId = node.attrs.blockId;
            if (
              node.isBlock &&
              parent === newState.doc &&
              types[node.type.name]
            ) {
              //If there is an existing ID and it is not already used we can re-use it.
              //Otherwise we create a new ID and replace it.
              const id =
                existingId && !blockIds[existingId] ? existingId : uuidv4();

              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                blockId: id,
              });

              blockIds[id] = true;
            }

            console.log({ blockIds });
          });

          return tr;
        },
      }),
    ];
  },
});
