import { memo, type ReactNode, useCallback, useMemo, useState } from 'react';

import CitationWindow from './private/CitationWindow';
import CitationWindowContext from './private/CitationWindowContext';

import { type ClaimWithText } from './private/types/ClaimWithText';
import { type ContextOf } from '../../types/ContextOf';

type Context = ContextOf<typeof CitationWindowContext>;

type Props = {
  children?: ReactNode | undefined;
};

export default memo(function CitationWindowProvider({ children }: Props) {
  const [showingClaim, setShowingClaim] = useState<ClaimWithText | undefined>();

  const handleClose = useCallback(() => {
    setShowingClaim(undefined);
  }, [setShowingClaim]);

  const show = useCallback<Context['show']>(
    claim => {
      setShowingClaim(claim);
    },
    [setShowingClaim]
  );

  const context = useMemo<Context>(() => ({ show }), [show]);

  return (
    <CitationWindowContext.Provider value={context}>
      {children}
      {showingClaim && <CitationWindow onClose={handleClose} text={showingClaim.text} />}
    </CitationWindowContext.Provider>
  );
});
