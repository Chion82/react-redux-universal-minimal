export default {
  getProfile : (username) =>  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json()),
};
