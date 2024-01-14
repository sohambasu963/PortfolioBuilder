import os
from dotenv import load_dotenv
import requests
import numpy as np
import scipy.optimize as sco

load_dotenv()
ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")


def get_analytics(symbols):
    start_date = '2014-01-01'
    end_date = '2024-01-01'
    calculations = ['MEAN', 'VARIANCE(annualized=True)', 'COVARIANCE(annualized=True)']

    BASE_URL = 'https://alphavantageapi.co/timeseries/analytics?'
    SYMBOLS_STR = ','.join(symbols)
    CALCULATIONS_STR = ','.join(calculations)
    URL = f'{BASE_URL}SYMBOLS={SYMBOLS_STR}&RANGE={start_date}&RANGE={end_date}&INTERVAL=DAILY&OHLC=close&CALCULATIONS={CALCULATIONS_STR}&apikey={ALPHA_VANTAGE_API_KEY}'

    r = requests.get(URL)
    data = r.json()
    return data['payload']

def portfolio_annualised_performance(weights, mean_returns, cov_matrix):
    returns = np.sum(mean_returns * weights ) * 252
    std = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))) * np.sqrt(252)
    return std, returns

def minimize_volatility(weights, mean_returns, cov_matrix):
    return portfolio_annualised_performance(weights, mean_returns, cov_matrix)[0]


def calculate_weights(data):
    """
    Calculate weights for each stock in the portfolio
    :param data: JSON data from the client
    :return: JSON data with weights added
    """
    symbols = [item['symbol'] for item in data]
    analytics = get_analytics(symbols)
    
    mean_returns = list(analytics['RETURNS_CALCULATIONS']['MEAN'].values())

    # Build covariance matrix
    cov_triangular = analytics['RETURNS_CALCULATIONS']['COVARIANCE(ANNUALIZED=TRUE)']['covariance']
    cov_matrix = [[0]*len(cov_triangular) for _ in range(len(cov_triangular))]

    for i, row in enumerate(cov_triangular):
        for j, val in enumerate(row):
            cov_matrix[i][j] = val
            cov_matrix[j][i] = val 

    num_assets = len(mean_returns)
    args = (mean_returns, cov_matrix)
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})  # The sum of weights is 1
    bound = (0.0, 1.0)
    bounds = tuple(bound for asset in range(num_assets))

    # Optimization to minimize volatility
    result = sco.minimize(minimize_volatility, num_assets * [1. / num_assets,], args=args, method='SLSQP', bounds=bounds, constraints=constraints)


    weights = result['x']
    for i, symbol in enumerate(symbols):
        data[i]['weight'] = weights[i]

    print(data)

    return data

if __name__ == '__main__':
    sample_data = [{'symbol': 'AAPL'}, {'symbol': 'MSFT'}, {'symbol': 'GOOGL'}, {'symbol': 'AMZN'}, {'symbol': 'META'}]
    calculate_weights(sample_data)

