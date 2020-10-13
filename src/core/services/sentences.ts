import axios from 'axios';

export type Sentence = {
  id: string;
  en: string;
  ja: string[];
}

export async function getAll() {
  const result = await axios.get<Sentence[]>('http://192.168.11.7:8000/sentences');
  console.log('result', result);
  if (result.status === 200) {
    return result.data;
  }

  return null;
}

export type SentenceAdd = Omit<Sentence, 'id'>;

export async function add(sentence: SentenceAdd) {
  const result = await axios.post('http://192.168.11.7:8000/sentences', sentence);
  console.log('result', result);
  if (result.status === 200) {
    return result.data;
  }

  return null;
}
