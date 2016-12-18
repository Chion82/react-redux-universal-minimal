export default {
  getProfile : (username) => {
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json());
  },
};
