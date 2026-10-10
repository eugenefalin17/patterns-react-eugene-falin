import { useEffect, useReducer } from 'react';
import { reducer } from './reducer/launchesReducer';
import { getLaunches } from './api';
import { LaunchCard } from './components/LaunchCard';
import { SimpleGrid } from '@mantine/core';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    launches: [],
    loading: true,
    error: null,
  });
useEffect(() => {
  dispatch({ type: 'FETCH_START' });

  const fetchLaunches = async () => {
    try {
      const launches = await getLaunches();

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: launches,
      });
    } catch {
      dispatch({
        type: 'FETCH_ERROR',
        payload: 'Не удалось загрузить запуски',
      });
    }
  };

  fetchLaunches();
}, []);

  

 if (state.loading) {
  return (
    <div>
      <h1>SpaceX Launches</h1>
      <p>Загрузка запусков...</p>
    </div>
  );
}

if (state.error) {
  return (
    <div>
      <h1>SpaceX Launches</h1>
      <p>{state.error}</p>
    </div>
  );
}

return (
  <div>
    <h1>SpaceX Launches</h1>

  
<SimpleGrid
  cols={{ base: 1, sm: 2, md: 3 }}
  spacing="md"
>

  {state.launches.map((launch) => (
    <LaunchCard key={launch.mission_name} launch={launch} />
  ))}
</SimpleGrid>
  </div>
);
};

export default App;