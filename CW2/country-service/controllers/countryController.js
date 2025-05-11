const axios = require('axios');


const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name');
    const names = response.data.map(c => c.name.common);
    res.json(names.sort());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country list' });
  }
};

const getCountryDetails = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
    const country = response.data[0];

    res.json({
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      currency: Object.values(country.currencies || {})[0]?.name || 'N/A',
      languages: Object.values(country.languages || {}).join(', ') || 'N/A',
      flag: country.flags?.png || ''
    });
  } catch (err) {
    res.status(404).json({ error: 'Country not found' });
  }
};

module.exports = {
  getAllCountries,
  getCountryDetails
};
