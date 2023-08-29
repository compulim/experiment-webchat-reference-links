// @ts-expect-error ts(1479) think we are CJS, we are actually ESM.
import { fromMarkdown } from 'mdast-util-from-markdown';

import type { Reference } from '../types/Reference';
import type { Claim as SchemaOrgClaim } from '../types/SchemaOrg/Claim';
import type { Definition, LinkReference, Node, Parent, Root, Text } from 'mdast';

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

function getURLProtocol(url: string): string | undefined {
  try {
    return new URL(url).protocol;
  } catch (error) {
    // Return undefined.
  }
}

export default function* getLinksFromMarkdown(text: string, claims: Map<string, SchemaOrgClaim>): Generator<Reference> {
  const tree = fromMarkdown(text);

  for (const node of walk(tree)) {
    if (isLinkReference(node)) {
      const definition = getDefinition(tree, node.identifier);

      if (!definition) {
        continue;
      }

      const { identifier: id, title, url } = definition;
      const textReferenced = node.children.find<Text>((node): node is Text => node.type === 'text')?.value || '';

      if (getURLProtocol(url) === 'x-pva-citation:') {
        const claim = claims.get(url);

        if (claim) {
          yield {
            citationText: claim.text,
            id,
            textReferenced,
            title: title || undefined
          };
        }
      } else {
        yield {
          id,
          textReferenced,
          title: title || undefined,
          url: definition.url
        };
      }
    }
  }
}
