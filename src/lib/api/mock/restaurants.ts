import { promises as fs } from 'fs';
import path from 'path';

export async function getRestaurants() {
  const jsonPath = path.join(process.cwd(), 'src/data/mocks/restaurants/list.json');
  const file = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(file);
}