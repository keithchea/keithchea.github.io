/*
    Interview question: 
    
    Write a function to get the profit or loss from a given array of stock prices. i.e. find the lowest price 
    (in the stock prices) to buy and sell it for the next highest price (in the stock prices)
    if there is no next highest price, it's considered as a loss (return negative)
*/

var stockPrices = [10, 9, 2, 5, 11];

function getMaxProfit(prices) {
  let lowPrice = getLowPrice(prices);
  let indexOfLowPrice = prices.indexOf(lowPrice);
  let highPrice = 0;
  for (let i = indexOfLowPrice + 1; i < prices.length; i++) {
    if (prices[i] > highPrice) {
      highPrice = prices[i];
    }
  }

  return highPrice - lowPrice;
}

function getLowPrice(prices) {
  let lowPrice = prices[0];
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < lowPrice) {
      lowPrice = prices[i];
    }
  }

  return lowPrice;
}

console.log(getMaxProfit(stockPrices));
