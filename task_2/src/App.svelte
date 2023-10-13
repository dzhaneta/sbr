<script lang="ts">
  import { onMount } from "svelte";

  type Currency = string;
  type Sum = number | null;

  let currencies: string[] = [];

  let selectedCurrency1: Currency = "";
  let selectedCurrency2: Currency = "";

  let sum1: Sum;
  let sum2: Sum;

  // api запрос и вытащить все валюты в интерфейс
  onMount(async () => {
    try {
      let response = await fetch("https://open.er-api.com/v6/latest/USD");
      let data = await response.json();
      
      console.log(Object.keys(data["rates"]));
      currencies = Object.keys(data["rates"]);
    } catch(err) {
      throw new Error("Упс! Произошла ошибка при запросе с сервера");
    }
  });

  async function exchangeHandler(inputCurrency: Currency) {
    console.log('exchange start!');
    let outputCurrency: Currency;
    let inputSum: Sum;
    let outputSum: Sum;
    if (inputCurrency === selectedCurrency1) {
      inputSum = sum1;
      outputCurrency = selectedCurrency2;
    } else {
      inputSum = sum2;
      outputCurrency = selectedCurrency1;
    }

    try {
      let response = await fetch(`https://open.er-api.com/v6/latest/${inputCurrency}`);
      let data = await response.json();
      let exchangeRate = data.rates[outputCurrency];
      outputSum = Number((exchangeRate * inputSum).toFixed(2));
      console.log('exchangeRate', exchangeRate);
      console.log('inputSum', inputSum);
      inputCurrency === selectedCurrency1
        ? sum2 = outputSum
        : sum1 = outputSum;
    } catch(err) {
      throw new Error("Упс! Произошла ошибка при запросе с сервера");
    }
  }

</script>

<main>
  <h1>Конвертер валют</h1>

  <p class="how-to">
    Выберите две валюты из выпадающих списков и введите сумму валюты, которую
    необходимо сконвертировать.
  </p>

  <form class="inputs-container">
    <fieldset class="fieldset">
      <select bind:value={selectedCurrency1} on:change={() => (sum1 = null)}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
      <input
        bind:value={sum1}
        on:keydown={() => exchangeHandler(selectedCurrency1)}
        disabled="{selectedCurrency1 === "" || selectedCurrency2 === ""}"
        type="number"
        min="1"
        class="input"
        placeholder="Введите сумму"
      >
    </fieldset>

    <fieldset class="fieldset">
      <select bind:value={selectedCurrency2} on:change={() => (sum2 = null)}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
      <input
        bind:value={sum2}
        on:keydown={() => exchangeHandler(selectedCurrency2)}
        disabled="{selectedCurrency1 === "" || selectedCurrency2 === ""}"
        type="number" 
        min="1"
        class="input" 
        placeholder="Введите сумму"
      >
    </fieldset>
  </form>

</main>

<style>
  .how-to {
    color: #888;
  }

  .inputs-container {
    margin: 40px 0;
    display: flex;
    justify-content: space-around;
  }

  .fieldset {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: none;
  }
  
  .input {
    width: 250px;
  }
</style>
