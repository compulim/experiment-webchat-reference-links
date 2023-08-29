// @ts-expect-error ts(1479) think we are CJS, we are actually ESM.
import { fromMarkdown } from 'mdast-util-from-markdown';

import type { Definition, LinkReference, Node, Parent, Root } from 'mdast';

type Link = {
  id: string;
  title?: string;
  url: string;
};

function* walk(tree: Parent): Generator<Node> {
  for (const child of tree.children) {
    yield child;

    const { type } = child;

    if (
      type === 'blockquote' ||
      type === 'delete' ||
      type === 'emphasis' ||
      type === 'footnoteDefinition' ||
      type === 'heading' ||
      type === 'link' ||
      type === 'linkReference' ||
      type === 'list' ||
      type === 'listItem' ||
      type === 'paragraph' ||
      type === 'strong' ||
      type === 'table' ||
      type === 'tableCell' ||
      type === 'tableRow'
    ) {
      yield* walk(child);
    }
  }
}

function isDefinition(node: Node): node is Definition {
  return node.type === 'definition';
}

function isLinkReference(node: Node): node is LinkReference {
  return node.type === 'linkReference';
}

function getDefinition(root: Root, identifier: string): Definition | undefined {
  return root.children.find<Definition>(
    (topLevelNode: Node): topLevelNode is Definition =>
      isDefinition(topLevelNode) && topLevelNode.identifier === identifier
  );
}

export default function* getLinksFromMarkdown(text: string): Generator<Link> {
  const tree = fromMarkdown(text);

  for (const node of walk(tree)) {
    if (isLinkReference(node)) {
      const definition = getDefinition(tree, node.identifier);

      if (definition) {
        yield {
          id: definition.identifier,
          title: definition.title || undefined,
          url: definition.url
        };
      }
    }
  }
}
