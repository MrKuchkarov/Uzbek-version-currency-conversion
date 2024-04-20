<script>
  // Импортирую функцию onMount из библиотеки Svelte
  import { onMount } from 'svelte';

  // Исходная валюта по умолчанию
  let fromCurrency = 'USD';
  // Целевая валюта по умолчанию
  let toCurrency = 'EUR';
  // Исходная сумма по умолчанию
  let amount = 1;
  // Переменная для хранения результата конвертации
  let convertedAmount = null;

  // Асинхронная функция для отправки запроса к API(из https://app.exchangerate-api.com) и получения курса обмена валют
  async function fetchExchangeRate() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/588e07d2fc9876f280376af3/latest/${fromCurrency}`);
    const data = await response.json();
    // Проверяю, есть ли свойство conversion_rates в объекте data
    if ('conversion_rates' in data) {
      // Возвращаю курс обмена для выбранной валюты, если свойство существует
      return data.conversion_rates[toCurrency];
    } else {
      console.error("Property 'conversion_rates' not found in API response data");
      // Возвращаю null, если свойство не найдено
      return null;
    }
  }

  // Асинхронная функция для конвертации валюты
  async function convertCurrency() {
    // Получаю курс обмена
    const rate = await fetchExchangeRate();
    // Вычисление результат конвертации
    convertedAmount = amount * rate;
  }

  function handleAmountChange(event) {
    // Обновляю значение исходной суммы при изменении в поле ввода
    amount = event.target.value;
    // Вызываю функцию конвертации для обновления результата
    convertCurrency();
  }

  function handleFromCurrencyChange(event) {
    // Обновляю исходную валюту при изменении выбора валюты
    fromCurrency = event.target.value;
    // Вызываю функцию конвертации для обновления результата
    convertCurrency();
  }

  function handleToCurrencyChange(event) {
    // Обновляю целевую валюту при изменении выбора валюты
    toCurrency = event.target.value;
    // Вызываю функцию конвертации для обновления результата
    convertCurrency();
  }

  onMount(convertCurrency);

</script>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  select,
  input {
    padding: 8px;
    font-size: 16px;
    margin-bottom: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  p {
    font-size: 18px;
    margin-top: 20px;
  }
</style>


<main>
  <h1>Currency Converter</h1>

  <div>
    <label for="fromCurrency">From:</label>
    <select id="fromCurrency" bind:value={fromCurrency} on:change={handleFromCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <!-- Можно добавить другие валюты по необходимости -->
    </select>
  </div>

  <div>
    <label for="toCurrency">To:</label>
    <select id="toCurrency" bind:value={toCurrency} on:change={handleToCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <!-- Можно добавить другие валюты по необходимости -->
    </select>
  </div>

  <div>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" bind:value={amount} on:input={handleAmountChange}>
  </div>

  <div>
    <p>Result: {convertedAmount}</p>
  </div>
</main>
