import './AttachmentWithReferences.css';

import { Fragment, memo, useMemo, type PropsWithChildren } from 'react';

import References from './References';

import type { WebChatActivity } from 'botframework-webchat-core';
import { PropsOf } from '../types/PropsOf';

type SchemaOrgEntity = SchemaOrgClaim;
type WebChatEntity = ItemTypeOfArray<Exclude<WebChatActivity['entities'], undefined>>;

// This is partial type of https://schema.org/Claim.
type SchemaOrgClaim = {
  '@id': string;
  text: string;
  type: 'https://schema.org/Claim';
  url?: string;
};

type Props = PropsWithChildren<{
  activity: WebChatActivity & {
    type: 'message';
  };
}>;

type ItemTypeOfArray<T extends Array<unknown> | ReadonlyArray<unknown> | T[]> = T extends Array<infer I>
  ? I
  : T extends ReadonlyArray<infer I>
  ? I
  : T extends (infer I)[]
  ? I
  : never;

type Reference = ItemTypeOfArray<PropsOf<typeof References>['references']>;

function isClaim(entity: undefined | WebChatEntity | SchemaOrgEntity): entity is SchemaOrgClaim {
  return entity?.type === 'https://schema.org/Claim';
}

// const mdLinkRegex = /\[(?<linkText>\S+?)\]\((?<linkUrl>\S+?)\)/g;

// function isReference(entity: { [key: string]: any }) {
//   return entity['@id'].startsWith('x-pva-citation');
// }

export default memo(function AttachmentWithReferences({ activity, children }: Props) {
  const entities = activity.entities as Array<SchemaOrgEntity | WebChatEntity> | undefined;
  const { text } = activity;

  // const links = text == null ? [] : [...text.matchAll(mdLinkRegex)].map(match => match.groups);
  // console.log('>>', links);

  // const references = entities?.filter(isReference);
  // const referenceText = references == null ? {} : Object.fromEntries(references.map(ref => [ref['@id'], ref.text]));

  // console.log('rtext >>', referenceText);

  if (activity.textFormat && activity.textFormat !== 'markdown') {
    return children;
  }

  const references = useMemo<ReadonlyArray<Reference>>(() => {
    if (!entities) {
      return Object.freeze([]);
    }

    return Object.freeze([
      {
        // TODO: Hardcoded, need to parse from Markdown OM.
        id: 'ref-1',
        title: 'Bing',
        url: 'https://bing.com/'
      },
      {
        // TODO: Hardcoded, need to parse from Markdown OM.
        id: 'ref-2',
        title: 'Microsoft',
        url: 'https://microsoft.com/'
      },
      ...entities.reduce<Array<Reference>>(
        (references: Array<Reference>, entity: SchemaOrgEntity | WebChatEntity): Array<Reference> => {
          if (isClaim(entity)) {
            references.push({
              id: entity['@id'],
              title: entity.text.substring(0, 100) // TODO: Maybe we don't need substring here.
            });
          }

          return references;
        },
        [] as Array<Reference>
      )
    ]);
  }, [entities, text]);

  return (
    <Fragment>
      {children}
      <details>
        <summary className={'refList'}>{references.length} references.</summary>
        {references.length && <References references={references} />}
      </details>
    </Fragment>
  );
});
