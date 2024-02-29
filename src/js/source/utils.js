export function dispatchEvent(e, data) {
  const customEvent = new CustomEvent(e, { detail: data, bubbles: true });
  window.dispatchEvent(customEvent);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}
