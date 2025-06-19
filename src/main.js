let lastChangedCurrency = null;

const rubleInputEl = document.querySelector("[data-js-ruble]");
const lariInputEl = document.querySelector("[data-js-lari]");
const rateInputEl = document.querySelector("[data-js-rate]");
const inputEls = document.querySelectorAll("input");

const replaceWrongValue = (value) => {
  const formattedString = value.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const dotCount = (formattedString.match(/\./g) || []).length;

  if (!formattedString.includes(".") || dotCount === 1) {
    return formattedString;
  } else {
    const arr = formattedString.split(".");
    return `${arr[0]}.${arr[1]}`;
  }
};

const canCalculate = () => {
  if (
    rateInputEl.value.length > 0 &&
    (rubleInputEl.value.length > 0 || lariInputEl.value.length > 0)
  ) {
    return true;
  } else {
    return false;
  }
};

const exchangeCurrency = () => {
  const rub = +rubleInputEl.value;
  const lari = +lariInputEl.value;
  const rate = +rateInputEl.value;
  const tax = 1;

  if (lastChangedCurrency === rubleInputEl) {
    lariInputEl.value = Math.floor(rub / (rate * (1 + tax / 100)));
  }
  if (lastChangedCurrency === lariInputEl) {
    rubleInputEl.value = Math.ceil(lari * rate + (lari * rate * tax) / 100);
  }
};

inputEls.forEach((input) => {
  input.addEventListener("input", (inputEvent) => {
    inputEvent.target.value = replaceWrongValue(inputEvent.target.value);

    if (inputEvent.target !== rateInputEl) {
      lastChangedCurrency = inputEvent.target;
    }

    if (canCalculate()) {
      exchangeCurrency();
    }
  });
});
