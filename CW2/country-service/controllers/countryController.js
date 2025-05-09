const axios = require('axios');

const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name');
    const names = response.data.map(c => c.name);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country list' });
  }
};

const getCountryDetails = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`https://restcountries.com/v2/name/${encodeURIComponent(name)}?fullText=true`);
    const country = response.data[0];
    res.json({
      name: country.name,
      capital: country.capital,
      currency: country.currencies[0].name,
      flag: country.flags.png
    });
  } catch (err) {
    res.status(404).json({ error: 'Country not found' });
  }
};

module.exports = {
  getAllCountries,
  getCountryDetails
};
