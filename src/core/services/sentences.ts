import axios from 'axios';
import { BASE_URL } from './request';

export type Sentence = {
  id: string;
  en: string;
  ja: string[];
}

export async function getAll() {
  const result = await axios.get<Sentence[]>(`${BASE_URL}/sentences`);
  if (result.status !== 200) {
    return null;
  }

  return result.data;
}

export type SentenceAdd = Omit<Sentence, 'id'>;

export async function add(sentence: SentenceAdd) {
  const result = await axios.post(`${BASE_URL}/sentences`, sentence);
  if (result.status !== 200) {
    return null;
  }

  return result.data;
}
