export function currencyConverter({ value, setDollars, setPounds}) {

    const exchangeUSD = 1.1;
    const exchangeGBP = 0.85;

    const dollars = (value * exchangeUSD).toFixed(2);
    const pounds = (value * exchangeGBP).toFixed(2);

    setDollars(dollars);
    setPounds(pounds);
}