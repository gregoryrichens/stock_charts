require("dotenv").config();

const alphaKey = process.env.ALPHA_VANTAGE_API_KEY;
// method for obtaining dummy data from AlphaVenture
const alphaFetch = async (symbol = "AAPL") => {
  try {
    const tickerResults = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${alphaKey}`
    );
    const tickerData = await tickerResults.json();

    const companyResults = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${alphaKey}`
    );
    const companyData = await companyResults.json();

    const data = Object.assign({}, tickerData, companyData);
    return data;
  } catch (err) {
    alert(err);
  }
};

export default alphaFetch;
