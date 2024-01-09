// @ts-expect-error no @types/markdown-it
import MarkdownIt from 'markdown-it';

export default function stripMarkdown(markdown: string): string {
  const markdownIt = new MarkdownIt({
    breaks: false,
    html: false,
    linkify: true,
    typographer: true,
    xhtmlOut: true
  });

  const html = markdownIt.render(markdown);

  const element = document.createElement('div');

  element.innerHTML = html;

  return element.textContent || '';
}

export function stripTeamsCitations(markdown: string): string {
  // replace Teams-style escaped markdown by stripping balanced backslashes before brackets; e.g. \\[1\\] -> [1]

  //                        v--- first capture group is some number of backslashes
  //                        v      v--- second capture group is the number inside the brackets
  //                        v      v   v--- first capture group repeated
  //                        v      v   v           v--- the value of the second capture group
  return markdown.replace(/(\\+)\[(\d+)\1\]/giu, `[$2]`);
}
