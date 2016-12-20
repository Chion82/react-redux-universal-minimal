export default {
  getProfile: (username) => fetch(`https://api.github.com/users/${username}?rand=${Math.random()}`)
    .then(response => response.json()),
};
