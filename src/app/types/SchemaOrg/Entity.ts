import type { Claim } from './Claim';

export type Entity = {
  '@context': 'https://schema.org/';
} & Claim;
