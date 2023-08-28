import './AttachmentWithReferences.css';

import { Fragment, memo, type PropsWithChildren } from 'react';

// type Entity = { '@type': string; '@id': string };

type Props = PropsWithChildren<{
  activity: {
    text?: string;
    entities?: Array<{ [key: string]: any }>;
  };
}>;

const mdLinkRegex = /\[(?<linkText>\S+?)\]\((?<linkUrl>\S+?)\)/g;

function isReference(entity: { [key: string]: any }) {
  return entity['@id'].startsWith('x-pva-citation');
}

export default memo(function AttachmentWithReferences({ activity: { text, entities }, children }: Props) {
  const links = text == null ? [] : [...text.matchAll(mdLinkRegex)].map(match => match.groups);
  console.log('>>', links);

  const references = entities?.filter(isReference);
  const referenceText = references == null ? {} : Object.fromEntries(references.map(ref => [ref['@id'], ref.text]));

  console.log('rtext >>', referenceText);

  return (
    <Fragment>
      {children}
      <div className={'refList'}>{links?.length} references.</div>
      {entities && <pre>{JSON.stringify(references, null, 2)}</pre>}
    </Fragment>
  );
});
