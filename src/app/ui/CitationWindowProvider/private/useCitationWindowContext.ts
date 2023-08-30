import { useContext } from 'react';

import CitationWindowContext from './CitationWindowContext';

import type { ContextOf } from '../../../types/ContextOf';

export default function useCitationWindowContext(): ContextOf<typeof CitationWindowContext> {
  return useContext(CitationWindowContext);
}
