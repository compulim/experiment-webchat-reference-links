import { useCallback, useReducer } from 'react';

import sampleActivity from './sampleActivity';

type SetActivityJSONAction = {
  payload: { activityJSON: string };
  type: 'SET_ACTIVITY_JSON';
};

type Action = SetActivityJSONAction;

type State = {
  activityJSON: string;
};

type SetActivityJSONCallback = (activityJSON: string) => void;

const DEFAULT_STATE: State = {
  activityJSON: JSON.stringify(sampleActivity, null, 2)
};

export default function useAppReducer(): [
  State,
  {
    setActivityJSON: SetActivityJSONCallback;
  }
] {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    if (action.type === 'SET_ACTIVITY_JSON') {
      state = { ...state, activityJSON: action.payload.activityJSON };
    }

    return state;
  }, DEFAULT_STATE);

  const setActivityJSON = useCallback<SetActivityJSONCallback>(
    activityJSON => dispatch({ payload: { activityJSON }, type: 'SET_ACTIVITY_JSON' }),
    [dispatch]
  );

  return [
    state,
    {
      setActivityJSON
    }
  ];
}
