// import { onErrorResumeNext } from 'botframework-webchat-core';
// @ts-expect-error @types/markdown-it is too old.
import MarkdownIt from 'markdown-it';
// import sanitizeHTML from 'sanitize-html';
import { sanitize } from 'dompurify';

import { pre as respectCRLFPre } from './markdownItPlugins/respectCRLF';
import ariaLabel, { post as ariaLabelPost, pre as ariaLabelPre } from './markdownItPlugins/ariaLabel';
// import betterLink from './markdownItPlugins/betterLink';
// import iterateLinkDefinitions from './private/iterateLinkDefinitions';

// TODO: These rules are okay-ed by security council.
//       We need to setup DOMPurify with the same rule as sanitize-html.
// const SANITIZE_HTML_OPTIONS = Object.freeze({
//   allowedAttributes: {
//     a: ['aria-label', 'class', 'href', 'name', 'rel', 'target'],
//     button: ['aria-label', 'class', 'type', 'value'],
//     img: ['alt', 'class', 'src', 'title'],
//     span: ['aria-label']
//   },
//   allowedSchemes: ['data', 'http', 'https', 'ftp', 'mailto', 'sip', 'tel'],
//   allowedTags: [
//     'a',
//     'b',
//     'blockquote',
//     'br',
//     'button',
//     'caption',
//     'code',
//     'del',
//     'div',
//     'em',
//     'h1',
//     'h2',
//     'h3',
//     'h4',
//     'h5',
//     'h6',
//     'hr',
//     'i',
//     'img',
//     'ins',
//     'li',
//     'nl',
//     'ol',
//     'p',
//     'pre',
//     's',
//     'span',
//     'strike',
//     'strong',
//     'table',
//     'tbody',
//     'td',
//     'tfoot',
//     'th',
//     'thead',
//     'tr',
//     'ul'
//   ],
//   // Bug of https://github.com/apostrophecms/sanitize-html/issues/633.
//   // They should not remove `alt=""` even though it is empty.
//   nonBooleanAttributes: []
// });

const MARKDOWN_IT_INIT = Object.freeze({
  breaks: false,
  html: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
});

// TODO: We need to rewrite "betterLink" using DOM.
// type BetterLinkDecoration = Exclude<ReturnType<Parameters<typeof betterLink>[1]>, undefined>;
type RenderInit = { externalLinkAlt?: string };

export default function render(
  markdown: string,
  { markdownRespectCRLF }: Readonly<{ markdownRespectCRLF: boolean }>,
  { externalLinkAlt = '' }: Readonly<RenderInit> = Object.freeze({})
): string {
  // TODO: We need to rewrite "betterLink" using DOM.
  // const linkDefinitions = Array.from(iterateLinkDefinitions(markdown));

  if (markdownRespectCRLF) {
    markdown = respectCRLFPre(markdown);
  }

  markdown = ariaLabelPre(markdown);

  const markdownIt = new MarkdownIt(MARKDOWN_IT_INIT).use(ariaLabel);

  // TODO: We need to rewrite "betterLink" using DOM.
  // .use(betterLink, (href: string, textContent: string): BetterLinkDecoration | undefined => {
  //   const decoration: BetterLinkDecoration = {
  //     rel: 'noopener noreferrer',
  //     target: '_blank'
  //   };

  //   const ariaLabelSegments: string[] = [textContent];
  //   const classes: Set<string> = new Set();
  //   const linkDefinition = linkDefinitions.find(({ url }) => url === href);
  //   const protocol = onErrorResumeNext(() => new URL(href).protocol);

  //   if (linkDefinition) {
  //     ariaLabelSegments.push(
  //       linkDefinition.title || onErrorResumeNext(() => new URL(linkDefinition.url).host) || linkDefinition.url
  //     );

  //     linkDefinition.identifier === textContent && classes.add('webchat__render-markdown__pure-identifier');
  //   }

  //   if (protocol === 'cite:') {
  //     decoration.asButton = true;

  //     classes.add('webchat__render-markdown__citation');
  //   } else if (protocol === 'http:' || protocol === 'https:') {
  //     decoration.iconAlt = externalLinkAlt;
  //     decoration.iconClassName = 'webchat__render-markdown__external-link-icon';

  //     ariaLabelSegments.push(externalLinkAlt);
  //   }

  //   // The first segment is textContent. Putting textContent is aria-label is useless.
  //   if (ariaLabelSegments.length > 1) {
  //     // If "aria-label" is already applied, do not overwrite it.
  //     decoration.ariaLabel = (value?: string | undefined) => value || ariaLabelSegments.join(' ');
  //   }

  //   decoration.className = Array.from(classes).join(' ');

  //   // By default, Markdown-It will set "title" to the link title in link definition.

  //   // However, "title" may be narrated by screen reader:
  //   // - Edge
  //   //   - <a> will narrate "aria-label" but not "title"
  //   //   - <button> will narrate both "aria-label" and "title"
  //   // - NVDA
  //   //   - <a> will narrate both "aria-label" and "title"
  //   //   - <button> will narrate both "aria-label" and "title"

  //   // Title makes it very difficult to control narrations by the screen reader. Thus, we are disabling it in favor of "aria-label".
  //   // This will not affect our accessibility compliance but UX. We could use a non-native tooltip or other forms of visual hint.

  //   decoration.title = false;

  //   return decoration;
  // });

  let html = markdownIt.render(markdown);

  html = ariaLabelPost(html);

  // return sanitizeHTML(html, SANITIZE_HTML_OPTIONS);

  // TODO: We need to port sanitize-html configuration to dompurify.
  const domTree = sanitize(html, { RETURN_DOM: true });

  for (const anchor of Array.from(domTree.querySelectorAll('a'))) {
    // TODO: The code inside this block, need to port the "betterLink" code above and inside the file "markdownItPlugins/betterLink.ts".
    //       Please be very careful when porting code from "betterLink". It is very difficult to spot if we missed some parts of it.
    //       I strongly recommend removing the code below and start it from scratch, then porting code line-by-line to make sure we don't miss anything.
    const icon = domTree.ownerDocument.createElement('img');

    icon.className = 'webchat__render-markdown__external-link-icon';
    icon.ariaLabel = anchor.ariaLabel ?? externalLinkAlt;
    icon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    anchor.rel = 'noopener noreferrer';
    anchor.target = '_blank';

    anchor.appendChild(icon);
  }

  return domTree.outerHTML;
}

// Code below are for reference. This is from previous commits.

// // return the DOM tree if parsing this string returns anything with a non-text HTML node in it, otherwise
// // parse it as Markdown into HTML and return that tree. Sanitizes the output in either case.
// function parseIntoHTML(text: string): HTMLElement {
//   // DOMParser is safe; even if it finds potentially dangerous objects, it doesn't run them, just parses them.
//   const parsedBody = domParser.parseFromString(text, 'text/html').body;
//   // need to use the old-school syntax here for ES version reasons
//   for (let i = 0; i < parsedBody.childNodes.length; i++) {
//     const node = parsedBody.childNodes[i];
//     if (node.nodeType !== Node.TEXT_NODE) {
//       return sanitize(parsedBody, { RETURN_DOM: true });
//     }
//   }
//   return sanitize(renderMarkdownAsHTML(text, undefined, { externalLinkAlt }), { RETURN_DOM: true });
// }

// function annotateLink(link: HTMLAnchorElement) {
//   const icon = document.createElement('img');
//   icon.className = 'webchat__render-markdown__external-link-icon externalLinkIcon';
//   icon.ariaLabel = link.ariaLabel ?? externalLinkAlt;
//   link.rel = 'noopener noreferrer';
//   link.target = '_blank';

//   link.appendChild(icon);
// }

// const contents = parseIntoHTML(text);

// contents.querySelectorAll('a').forEach(annotateLink);

// return (
//   <div className="mainWindow webchat__popover">
//     <FocusTrapZone className="webchat__popover__box" firstFocusableTarget={'.closeBox'}>
//       <span className="webchat__popover__header">
//         <button
//           aria-label={localize('KEYBOARD_HELP_CLOSE_BUTTON_ALT')}
//           className="webchat__popover__close-button"
//           onClick={handleClose}
//         >
// @@ -48,8 +80,8 @@ const CitationWindow = ({ text, title, onClose: handleClose }: Props) => {

//       <span
//         className={['contents', citationWindowOverrides].join(' ')}
//         ref={ref => {
//           contents.childNodes.forEach(node => ref?.appendChild(node));
//         }}
//       />
//     </FocusTrapZone>
