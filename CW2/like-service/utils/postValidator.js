const axios = require('axios');

const postExists = async (postId) => {
  const url = `http://localhost:5002/api/blogs/${postId}`;
  let attempts = 0;
  const maxRetries = 3;

  while (attempts < maxRetries) {
    try {
      const response = await axios.get(url, { timeout: 3000 });
      return response.status === 200;
    } catch (err) {
      attempts++;
      console.warn(`Attempt ${attempts}: Blog service unavailable - ${err.message}`);
      await new Promise((res) => setTimeout(res, 1000 * attempts)); 
    }
  }

  console.error('All retries failed. Blog service unreachable.');
  return false;
};

module.exports = { postExists };
