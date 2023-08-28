// @ts-expect-error "markdown-it" has no typed
import MarkdownIt from 'markdown-it';

type MarkdownItNodeAttrs = [string, string];

type MarkdownItNode = {
  attrs: null | Array<MarkdownItNodeAttrs>;
  children: null | Array<MarkdownItNode>;
  type: string | 'link_open';
};

type MarkdownItLinkOpenNodeAttrs = ['href', string];

type MarkdownItLinkOpenNode = MarkdownItNode & {
  attrs: Array<MarkdownItNodeAttrs | MarkdownItLinkOpenNodeAttrs>;
  children: null;
  type: 'link_open';
};

type Link = {
  url: string;
};

function* walk(tree: MarkdownItNode): Generator<MarkdownItNode> {
  if (tree.children) {
    for (const node of tree.children) {
      yield node;
      yield* walk(node);
    }
  }
}

function isLinkOpen(node: MarkdownItNode): node is MarkdownItLinkOpenNode {
  return node.type === 'link_open';
}

export default function* getLinksFromMarkdown(text: string): Generator<Link> {
  const markdownTree: Array<MarkdownItNode> = new MarkdownIt().parse(text, {});
  const root: MarkdownItNode = { attrs: null, children: markdownTree, type: 'root' };

  for (const node of walk(root)) {
    if (isLinkOpen(node)) {
      yield {
        url: node.attrs.find(([name]) => name === 'href')?.[1] || ''
      };
    }
  }
}
