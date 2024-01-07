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
