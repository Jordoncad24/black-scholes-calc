import math
from scipy.stats import norm

def calculate_black_scholes(S0, X, r, T, sigma, dividend_yield=0.0):
    d1 = (math.log(S0 / X) + (r - dividend_yield + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    call_price = (S0 * math.exp(-dividend_yield * T) * norm.cdf(d1)) - (X * math.exp(-r * T) * norm.cdf(d2))
    put_price = (X * math.exp(-r * T) * norm.cdf(-d2)) - (S0 * math.exp(-dividend_yield * T) * norm.cdf(-d1))
    return call_price, put_price
