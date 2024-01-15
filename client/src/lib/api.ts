export const fetchStockSuggestions = async (searchTerm: string) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const API_URL = "https://www.alphavantage.co/query";
  const FUNCTION = "symbol_SEARCH";

  const response = await fetch(
    `${API_URL}?function=${FUNCTION}&keywords=${searchTerm}&apikey=${apiKey}`,
  );
  const data = await response.json();

  if (!data.bestMatches) {
    console.error("Invalid API response:", data);
    return [];
  }

  const suggestions = data.bestMatches
    .filter((item: any) => {
      const currency = item["8. currency"];
      return currency === "USD" || currency === "CAD";
    })
    .map((item: any) => ({
      symbol: item["1. symbol"],
      name: item["2. name"],
      currency: item["8. currency"],
    }));

  return suggestions;
};

type Suggestion = {
  symbol: string;
  name: string;
  currency: string;
};

export const fetchStockData = async (suggestion: Suggestion) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const API_URL = "https://www.alphavantage.co/query";
  const QUOTE_FUNCTION = "GLOBAL_QUOTE";
  const OVERVIEW_FUNCTION = "OVERVIEW";

  const quoteResponse = await fetch(
    `${API_URL}?function=${QUOTE_FUNCTION}&symbol=${suggestion.symbol}&apikey=${apiKey}`,
  );
  const quoteData = await quoteResponse.json();

  const overviewResponse = await fetch(
    `${API_URL}?function=${OVERVIEW_FUNCTION}&symbol=${
      suggestion.symbol.split(".")[0]
    }&apikey=${apiKey}`,
  );
  const overviewData = await overviewResponse.json();

  const historicalData = await fetchStockHistoricalData(suggestion.symbol);

  const stockData = {
    symbol: suggestion.symbol,
    price: Number(quoteData["Global Quote"]["05. price"]).toFixed(2),
    currency: suggestion.currency,
    historicalData: historicalData,
  };

  return stockData;
};

const fetchStockHistoricalData = async (symbol: string) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const API_URL = "https://www.alphavantage.co/query";
  const FUNCTION = "TIME_SERIES_DAILY_ADJUSTED";
  const response = await fetch(
    `${API_URL}?function=${FUNCTION}&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`,
  );
  const data = await response.json();

  if (!data["Time Series (Daily)"]) {
    console.error("Invalid API response:", data);
    return [];
  }

  const timeSeriesData = data["Time Series (Daily)"];

  const dates = Object.keys(timeSeriesData);
  const adjustedClosingPrices = dates.map((date) =>
    parseFloat(timeSeriesData[date]["5. adjusted close"]).toFixed(2),
  );

  const historicalData = {
    symbol: data["Meta Data"]["2. Symbol"],
    labels: dates,
    data: adjustedClosingPrices,
  };

  return historicalData;
};
