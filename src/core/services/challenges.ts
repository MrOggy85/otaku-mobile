import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './request';

type Tag = {
  id: string;
  name: string;
}

export type Challenge = {
  id: number;
  name: string;
  tags: Tag[];
}

export async function getChallenges() {
  let result: AxiosResponse<Challenge[]>;
  try {
    result = await axios.get<Challenge[]>(`${BASE_URL}/challenges`);
  } catch (error) {
    return null;
  }

  if (result.status !== 200) {
    return null;
  }

  return result.data;
}
