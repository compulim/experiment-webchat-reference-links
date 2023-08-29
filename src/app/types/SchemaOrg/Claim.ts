import type { Entity } from './Entity';

// This is partial type of https://schema.org/Claim.
export type Claim = Entity & {
  '@context': 'https://schema.org/';
  '@id'?: string;
  '@type': 'Claim';
  text: string;
  type: 'https://schema.org/Claim';
  url?: string;
};

export function isClaim(entity: Entity): entity is Claim {
  return (
    entity.type === 'https://schema.org/Claim' ||
    (entity['@context'] === 'https://schema.org/' && entity['@type'] === 'Claim')
  );
}
