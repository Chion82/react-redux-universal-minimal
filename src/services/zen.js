export default {
  getZen: () => fetch(`https://api.github.com/zen?rand=${Math.random()}`)
    .then(response => response.text())
    .then(text => ({ text })),
};
