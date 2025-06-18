class ExchangeRateCalculator {
  lastChangedCurrency = null;

  constructor() {
    this.rubleInputEl = document.querySelector("[data-js-ruble]");
    this.lariInputEl = document.querySelector("[data-js-lari]");
    this.rateInputEl = document.querySelector("[data-js-rate]");
    this.inputEls = document.querySelectorAll("input");
    this.bindEvents();
  }

  replaceWrongValue(value) {
    const stringWithoutCommasAndLetters = value
      .replace(/,/g, ".")
      .replace(/[^\d.]/g, "");
    const dotCount = (stringWithoutCommasAndLetters.match(/\./g) || []).length;

    if (!stringWithoutCommasAndLetters.includes(".") || dotCount === 1) {
      return stringWithoutCommasAndLetters;
    } else {
      const arr = stringWithoutCommasAndLetters.split(".");
      return `${arr[0]}.${arr[1]}`;
    }
  }

  canCalculate() {
    if (
      this.rateInputEl.value.length > 0 &&
      (this.rubleInputEl.value.length > 0 || this.lariInputEl.value.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  exchangeCurrency() {
    const rub = +this.rubleInputEl.value;
    const lari = +this.lariInputEl.value;
    const rate = +this.rateInputEl.value;
    const tax = 1;

    if (this.lastChangedCurrency === this.rubleInputEl) {
      this.lariInputEl.value = Math.floor(rub / (rate * (1 + tax / 100)));
    }
    if (this.lastChangedCurrency === this.lariInputEl) {
      this.rubleInputEl.value = Math.ceil(
        lari * rate + (lari * rate * tax) / 100
      );
    }
  }

  bindEvents() {
    this.inputEls.forEach((input) => {
      input.addEventListener("input", (inputEvent) => {
        inputEvent.target.value = this.replaceWrongValue(
          inputEvent.target.value
        );

        if (inputEvent.target !== this.rateInputEl) {
          this.lastChangedCurrency = inputEvent.target;
        }

        if (this.canCalculate()) {
          this.exchangeCurrency();
        }
      });
    });
  }
}

new ExchangeRateCalculator();
