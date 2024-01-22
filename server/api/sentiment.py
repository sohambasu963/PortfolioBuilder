import os
from dotenv import load_dotenv
import requests

load_dotenv()
ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")

def get_news(ticker):
    BASE_URL = "https://www.alphavantage.co/query?"
    URL = f"{BASE_URL}function=NEWS_SENTIMENT&tickers={ticker}&limit=10&apikey={ALPHA_VANTAGE_API_KEY}"

    r = requests.get(URL)
    data = r.json()
    return data

def calculate_ticker_sentiment(ticker):
    total_sentiment = 0
    num_articles = 0
    news = get_news(ticker)
    for article in news["feed"]:
        total_sentiment += float(article["overall_sentiment_score"])
        num_articles += 1

    return round(total_sentiment / num_articles, 4) if num_articles > 0 else 0

if __name__ == "__main__":
    tickers = ["AAPL", "META", "CRYPTO:BTC"]
    for ticker in tickers:
        print(f"{ticker}: {calculate_ticker_sentiment(ticker)}")