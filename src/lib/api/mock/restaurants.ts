import { promises as fs } from 'fs';
import path from 'path';

export async function getRestaurants() {
  const jsonPath = path.join(process.cwd(), 'src/data/mocks/restaurants/list.json');
  const file = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(file);
}

export async function getDetails(id: string) {
  try {
    const jsonPath = path.join(process.cwd(), `src/data/mocks/restaurants/details/${id}.json`);
    const file = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return {}
      // throw new Error(`Restaurante com ID ${id} não encontrado`);
    }
    return {};
  }
}