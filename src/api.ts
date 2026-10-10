
import type { Launch } from './types/launch';

const API_URL = 'https://kata-spacex.onrender.com/api/launches';

type LaunchesResponse = {
  launches: Launch[];
};

export const getLaunches = async (): Promise<Launch[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Не удалось загрузить запуски');
  }

  const data: LaunchesResponse = await response.json();

  return data.launches;
};
