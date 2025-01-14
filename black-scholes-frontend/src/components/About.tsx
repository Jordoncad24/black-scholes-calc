import React from "react";
import KatexComponent from "./KaTeXComponent.tsx";

const About = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Touchstone Advisory Black Scholes Calculator
      </h1>

      <h2>How to Use the Calculator</h2>
      <p>
        Enter the values for the Underlying Asset Price (S0), Strike Price (X),
        Time to Expiration (T), Volatility (σ), Risk-Free Rate (r), and Dividend
        Yield (q). Then click the "Calculate" button to get the Call and Put prices.
      </p>

      <p>
        The Calculator is also capable of storing the results of your calculations,
        which can be viewed by clicking on the history tab. This tab also allows you
        to order your calculations, but also select and delete specific results from
        the table by clicking the "Clear History" button, or delete specific results
        by clicking on the row, and then clicking on the "Delete Selected Record or
        Enter ID" button.
      </p>

      <h2>History of the Formula</h2>
      <p>
        The Black-Scholes formula was first introduced by economists Fischer Black
        and Myron Scholes in 1973. It is a mathematical model used for pricing options,
        specifically European call and put options.
      </p>

      <h2>When to Use the Black-Scholes Model</h2>
      <p>
        The Black-Scholes model calculates the theoretical price of options based
        on several factors, including the underlying asset price, strike price, time
        to expiration, volatility, and interest rates. It is commonly used for pricing
        options on stocks, commodities, and other assets.
      </p>
      <h2>Black-Scholes Formula</h2>
      <p>The Black-Scholes formula is as follows:</p>
      <KatexComponent formula="C = S_0 N(d_1) - X e^{-rT} N(d_2)" displayMode />

      <p>Where:</p>
      <ul>
        <li><strong>C</strong> = Call option price</li>
        <li><strong>S₀</strong> = Current stock price</li>
        <li><strong>X</strong> = Strike price</li>
        <li><strong>N(d₁)</strong> and <strong>N(d₂)</strong> = Cumulative standard normal distribution functions of <strong>d₁</strong> and <strong>d₂</strong></li>
        <li><strong>T</strong> = Term of the option</li>
        <li><strong>r</strong> = Risk-free interest rate</li>
        <li><strong>q</strong> = Dividend yield percentage</li>
        <li><strong>σ</strong> = Annualized volatility of the stock</li>
      </ul>

      <p>For a put option, the formula is:</p>
      <KatexComponent formula="P = X e^{-rT} N(-d_2) - S_0 N(-d_1)" displayMode />

      <h2>d₁ and d₂ Formulas</h2>
      <p><KatexComponent
        formula="d_1 = \frac{\ln(S_0 / X) + \left(r + \frac{\sigma^2}{2}\right) T}{\sigma \sqrt{T}}"
        displayMode
      /></p>
      <p><KatexComponent
        formula="d_2 = d_1 - \sigma \sqrt{T}"
        displayMode
      /></p>

      <p>Where:</p>
      <ul>
        <li><strong>σ</strong> = Volatility of the underlying asset</li>
        <li><strong>ln</strong> = Natural logarithm</li>
        <li><strong>√T</strong> = Square root of time to expiration</li>
      </ul>
    </div>
  );
};

export default About;
