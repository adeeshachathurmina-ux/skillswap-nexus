import { people } from './data';

export type DemoRequest = { id: string; personId: number; goal: string; status: 'pending' | 'accepted' | 'declined' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'; createdAt: string; history: Array<{ status: string; at: string }> };

const requests: DemoRequest[] = [];

export function listDemoRequests() {
  return requests;
}

export function createDemoRequest(personId: number, goal: string) {
  const request: DemoRequest = { id: crypto.randomUUID(), personId, goal, status: 'pending', createdAt: new Date().toISOString(), history: [{ status: 'pending', at: new Date().toISOString() }] };
  requests.unshift(request);
  return request;
}

export function updateDemoRequest(id: string, status: DemoRequest['status']) {
  const request = requests.find((item) => item.id === id);
  if (!request) return null;
  request.status = status;
  request.history.push({ status, at: new Date().toISOString() });
  return request;
}

export function demoPersonExists(id: number) {
  return people.some((person) => person.id === id);
}
