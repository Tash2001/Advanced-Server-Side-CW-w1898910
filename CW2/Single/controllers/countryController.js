const axios = require('axios');

//contry dropdown
const getAllCountries = async (req,res)=>{
    try{
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map(country =>({
            name:country.name.common,
            code: country.cca2

        })).sort((a,b)=> a.name.localeCompare(b.name));
        res.json(countries);
    }catch(err){
        res.status(500).json({error:'Failed to fetch countries'});
    }
};

const getCountryInfo = async (req,res)=>{
    try{
        const countryName=req.params.name;
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const country = response.data[0];

        const result ={
            name:country.name.common,
            flag : country.flags.svg,
            capital:country.capital?.[0] || 'N/A',
            currency: Object.values(country.currencies)?.[0]?.name || 'N/A'

        };
        res.json(result);
    }catch(err){
        res.status(404).json({error:'Country not Found'});
    }
};

module.exports ={getAllCountries,getCountryInfo};