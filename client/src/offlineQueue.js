const STORAGE_KEY = 'collab_playlist_offline_queue_v1';

export function loadQueue() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveQueue(queue) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

export function enqueue(action) {
  const q = loadQueue();
  q.push({ ...action, queuedAt: Date.now() });
  saveQueue(q);
  return q;
}

export function clearQueue() {
  saveQueue([]);
}

export function dequeueAll() {
  const q = loadQueue();
  clearQueue();
  return q;
}