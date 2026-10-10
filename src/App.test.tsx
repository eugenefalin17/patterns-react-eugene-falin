
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { getLaunches } from './api';
import type { Launch } from './types/launch';

vi.mock('./api', () => ({
  getLaunches: vi.fn(),
}));

const launches: Launch[] = [
  {
    mission_name: 'FalconSat',
    rocket: { rocket_name: 'Falcon 1' },
    links: {},
    details: 'First launch',
  },
];

const renderApp = () =>
  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('App', () => {
  it('показывает состояние загрузки', () => {
    vi.mocked(getLaunches).mockReturnValue(new Promise(() => {}));

    renderApp();

    expect(screen.getByText('Загрузка запусков...')).toBeInTheDocument();
  });

  it('показывает карточки после успешной загрузки', async () => {
    vi.mocked(getLaunches).mockResolvedValue(launches);

    renderApp();

    expect(await screen.findByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
  });

  it('показывает ошибку при неудачной загрузке', async () => {
    vi.mocked(getLaunches).mockRejectedValue(
      new Error('Не удалось загрузить запуски')
    );

    renderApp();

    await waitFor(() => {
      expect(
        screen.getByText('Не удалось загрузить запуски')
      ).toBeInTheDocument();
    });
  });
});
