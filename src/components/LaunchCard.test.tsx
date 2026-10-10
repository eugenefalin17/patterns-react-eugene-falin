
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { LaunchCard } from './LaunchCard';
import type { Launch } from '../types/launch';

const launch: Launch = {
  mission_name: 'FalconSat',
  rocket: {
    rocket_name: 'Falcon 1',
  },
  links: {
    mission_patch_small: 'https://example.com/patch-small.png',
    mission_patch: 'https://example.com/patch.png',
  },
  details: 'First launch',
};

const renderCard = () =>
  render(
    <MantineProvider>
      <LaunchCard launch={launch} />
    </MantineProvider>
  );

describe('LaunchCard', () => {
  it('показывает название миссии и ракеты', () => {
    renderCard();

    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
  });

  it('открывает модальное окно по нажатию See more', () => {
    renderCard();

    fireEvent.click(screen.getByRole('button', { name: 'See more' }));

    expect(
  screen.getAllByText('FalconSat').length
).toBe(2);
    expect(screen.getByText('First launch')).toBeInTheDocument();
  });

  it('закрывает модальное окно по нажатию на крестик', () => {
    renderCard();

    fireEvent.click(screen.getByRole('button', { name: 'See more' }));

    expect(
      screen.getByText('First launch')
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Close modal' })
    );

    expect(
      screen.queryByText('First launch')
    ).not.toBeInTheDocument();
  });

  it('закрывает модальное окно по Escape', () => {
    renderCard();

    fireEvent.click(screen.getByRole('button', { name: 'See more' }));

    expect(screen.getByText('First launch')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByText('First launch')).not.toBeInTheDocument();
  });

it('закрывает модальное окно по клику на фон', () => {
  renderCard();

  fireEvent.click(screen.getByRole('button', { name: 'See more' }));

  expect(screen.getByText('First launch')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('presentation'));

  expect(screen.queryByText('First launch')).not.toBeInTheDocument();
});

});
