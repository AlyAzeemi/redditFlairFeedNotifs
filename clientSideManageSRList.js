const axios = require("axios");
const { serverURL, subRedditList } = require("./clientSideInput");

axios
  .post(`${serverURL}`, { subRedditList })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
