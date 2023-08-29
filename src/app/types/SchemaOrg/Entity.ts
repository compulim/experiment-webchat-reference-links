export type Entity = {
  '@context': 'https://schema.org/';
  '@type': string;
  type: `https://schema.org/${string}`;
};

export function isEntity(entity: { type: string }): entity is Entity {
  return entity.type.startsWith('https://schema.org/');
}
