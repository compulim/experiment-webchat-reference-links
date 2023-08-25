import { useCallback, useReducer } from 'react';

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
  activityJSON: JSON.stringify(
    {
      conversation: { id: 'c-00001' },
      from: { id: 'bot', provenance: '[Surfaced by Azure OpenAI](https://microsoft.com/...)' },
      type: 'message',
      text: 'Sure, you should override the default proxy settings([1])[ref-1]([2])[ref-2], when your proxy server requires authentication([3])[cite-1].\n\n[ref-1]: https://...microsoft.com/ "Page title"\n[ref-2]: https://microsoft.com/ "Page title"\n[cite-1]: x-pva-citation:cite-a "Introduction Configuring proxy..."',
      entities: [
        {
          '@context': 'https://schema.org/',
          '@id': 'x-pva-citation:cite-a',
          '@type': 'Claim',
          text: '## Introduction\n\nConfiguring proxy settings is a fundamental aspect of network and system administration.\n\n## Understandingi Proxy Auto-Discovery (PAD)\n\nProxy Auto-Discovery, often abbreviated as PAD, is a mechanism that simplifies the process of configuring proxy settings for network-connected devices.',
          type: 'https://schema.org/Claim'
        },
        {
          type: '...',
          text: 'Surfaced by Azure OpenAI',
          url: 'https://microsoft.com/...'
        }
      ],
      'footnote:text': 'Surfaced by Azure OpenAI',
      'footnote:url': 'https://microsoft.com/...'
    },
    null,
    2
  )
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
