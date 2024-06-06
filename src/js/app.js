import Popup from './source/pop-up';

document.addEventListener('DOMContentLoaded', function() {
  const loadedSpeed = document.getElementById('loaded-speed');
  const [entry] = performance.getEntriesByType("navigation");
  loadedSpeed.innerHTML = `${entry.domContentLoadedEventStart}ms`;
});
