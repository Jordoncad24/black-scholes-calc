from scipy.stats import norm

# Known test cases
test_values = [0, 1.0, -1.0]
for d1 in test_values:
    cdf_value = norm.cdf(d1)
    print(f"norm.cdf({d1}) = {cdf_value}")
