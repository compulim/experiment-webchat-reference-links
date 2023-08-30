import { createContext } from 'react';

import { type ClaimWithText } from './types/ClaimWithText';

type ContextType = {
  show(claim: ClaimWithText): void;
};

const CitationWindowContext = createContext<ContextType>({
  get show(): () => void {
    throw new Error('This property cannot be accessed outside of <CitationWindowProvider>.');
  }
});

export default CitationWindowContext;
