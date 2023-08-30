import { useContext } from 'react';

import CitationWindowContext from './private/CitationWindowContext';

import { type ContextOf } from '../../types/ContextOf';

type Context = ContextOf<typeof CitationWindowContext>;

export default function useShowCitationWindow(): Context['show'] {
  const context = useContext(CitationWindowContext);

  return context.show;
}
