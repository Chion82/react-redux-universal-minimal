export default {
  getZen: () => fetch('https://api.github.com/zen')
    .then(response => response.text())
    .then(text => ({ text })),
};
