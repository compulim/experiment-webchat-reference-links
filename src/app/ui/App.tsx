import './App.css';

import { memo, useMemo } from 'react';

import ActivityInput from './ActivityInput';
import Chat from './Chat';
import useAppReducer from '../data/useAppReducer';
import onErrorResumeNext from '../utils/onErrorResumeNext';

export default memo(function App() {
  const [{ activityJSON }, { setActivityJSON }] = useAppReducer();
  const activity = useMemo(() => onErrorResumeNext(() => JSON.parse(activityJSON)), [activityJSON]);

  return (
    <div className="app">
      <div className="app__pane">
        <ActivityInput onChange={setActivityJSON} value={activityJSON} />
      </div>
      <div className="app__pane">
        <Chat activity={activity} key={activityJSON} />
      </div>
    </div>
  );
});
