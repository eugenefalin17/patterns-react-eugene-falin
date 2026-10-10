
import { describe, it, expect } from 'vitest';
import { reducer } from './launchesReducer';

describe('launchesReducer', () => {
  it('сохраняет запуски после успешной загрузки', () => {
    const initialState = {
      launches: [],
      loading: true,
      error: null,
    };

    const launches = [
      {
        mission_name: 'FalconSat',
        rocket: { rocket_name: 'Falcon 1' },
        details: 'First launch',
      },
    ];

    const newState = reducer(initialState, {
      type: 'FETCH_SUCCESS',
      payload: launches,
    });

    expect(newState.launches).toEqual(launches);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

it('сохраняет ошибку после неудачной загрузки', () => {
  const initialState = {
    launches: [],
    loading: true,
    error: null,
  };

  const newState = reducer(initialState, {
    type: 'FETCH_ERROR',
    payload: 'Не удалось загрузить запуски',
  });

  expect(newState.loading).toBe(false);
  expect(newState.error).toBe('Не удалось загрузить запуски');
});

it('включает загрузку при FETCH_START', () => {
  const initialState = {
    launches: [],
    loading: false,
    error: 'Старая ошибка',
  };

  const newState = reducer(initialState, {
    type: 'FETCH_START',
  });

  expect(newState.loading).toBe(true);
  expect(newState.error).toBe(null);
});

});
