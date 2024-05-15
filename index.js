
// -----Inputs------------------

let n = 4;
let Vol_min = 7;
let W_max = 10;
let w = [3, 4, 2, 5];
let vol = [2, 3, 1, 4];
let val = [10, 15, 8, 20];

// -----------------------------

let dp = Array.from({ length: n + 1 }, () => Array.from({ length: W_max + 1 }, () => -1));
let choice = Array.from({ length: n + 1 }, () => Array(W_max + 1).fill(false));

function selectInstruments(item, weight, volume) {
  if (dp[item][weight] === -1) {
    let max = -2;
    let selectedItem = -1;
    
    for (let i = item; i < n; i++) {
      if (weight + w[i] <= W_max) {
        let res = selectInstruments(i + 1, weight + w[i], volume + vol[i]);
        if (res !== -2) {
          if (res + val[i] > max) {
            max = res + val[i];
            selectedItem = i;
          }
        }
      }
    }

    if (max === -2 && volume >= Vol_min) {
      dp[item][weight] = 0;
    } else {
      dp[item][weight] = max;
      if (selectedItem !== -1) {
        choice[item][weight] = selectedItem;
      }
    }
  }
  return dp[item][weight];
}

let maxValue = selectInstruments(0, 0, 0);
let selectedInstr = [];
let totalWt = 0;
let totalVl = 0;
let currentItem = 0;
let currentWt = 0;

while (currentItem < n && choice[currentItem][currentWt] !== false) {
  let selected = choice[currentItem][currentWt];
  selectedInstr.push(selected + 1); // Adjusting for 1-based index
  totalWt += w[selected];
  totalVl += vol[selected];
  currentWt += w[selected];
  currentItem = selected + 1;
}

console.log('Selected combination of instruments:', selectedInstr);
console.log('Total weight of selected instruments:', totalWt);
console.log('Total volume of selected instruments:', totalVl);
console.log('Total scientific value achieved:', maxValue);
