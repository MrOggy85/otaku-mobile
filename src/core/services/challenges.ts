import axios from 'axios';

export type Challenge = {
  id: number;
  key: string;
  name: string;
}

export async function getChallenges() {
  const result = await axios.get<Challenge[]>('http://192.168.11.7:8000/challenges');
  console.log('result', result);
  if (result.status === 200) {
    return result.data;
  }

  return null;
}
