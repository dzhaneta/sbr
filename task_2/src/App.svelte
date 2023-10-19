<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./lib/Loader.svelte";

  let currencies: string[] = [];
  let rates: { [index: string]: number } = {};
  let isLoading: boolean = false;

  type Currency = string;
  type Sum = number;

  let currencyOne: Currency = "RUB";
  let currencyTwo: Currency = "USD";

  let sumOne: Sum = 0;
  let sumTwo: Sum = 0;

  // API REQ FOR CURRENCIES & RATES SETUP
  onMount(async () => {
    isLoading = true;

    try {
      let response = await fetch("https://open.er-api.com/v6/latest/RUB");
      let data = await response.json();
      
      currencies = Object.keys(data["rates"]);
      rates = data.rates;
    } catch(err) {
      throw new Error("Упс! Произошла ошибка при запросе с сервера");
    } finally {
      isLoading = false;
    }
  });

  // SUM CHANGE HANDLERS
  const onChangeSumOne = (inputSum: Sum) => {
    console.log('exchange 1 start!');
    const res: Sum = (inputSum / rates[currencyOne]) * rates[currencyTwo];
    sumTwo = Number(res.toFixed(2));
  }

  const onChangeSumTwo = (inputSum: Sum) => {
    console.log('exchange 2 start!');
    const res: Sum = (rates[currencyOne] / rates[currencyTwo]) * inputSum;
    sumOne = Number(res.toFixed(2));
  }

  // CURRENCY CHANGE HANDLERS
  const onCurrencyChange = (currency: Currency) => {
    currency === currencyOne
      ? onChangeSumOne(sumOne)
      : onChangeSumTwo(sumTwo);
  }

</script>

<main>
  <h1>Конвертер валют</h1>
  
  <p class="how-to">
    Выберите две валюты из выпадающих списков и введите сумму валюты, которую
    необходимо сконвертировать.
  </p>

  {#if isLoading === true}
    <Loader />
  {:else}
    <form class="inputs-container">
      <fieldset class="fieldset">
        <select bind:value={currencyOne} on:change={() => onCurrencyChange(currencyOne)}>
          {#each currencies as currency}
            <option value={currency}>
              {currency}
            </option>
          {/each}
        </select>
        <input
          bind:value={sumOne}
          on:keyup={() => onChangeSumOne(sumOne)}
          type="number"
          min="1"
          class="input"
          placeholder="Введите сумму"
        >
      </fieldset>

      <fieldset class="fieldset">
        <select bind:value={currencyTwo} on:change={() => onCurrencyChange(currencyTwo)}>
          {#each currencies as currency}
            <option value={currency}>
              {currency}
            </option>
          {/each}
        </select>
        <input
          bind:value={sumTwo}
          on:keyup={() => onChangeSumTwo(sumTwo)}
          type="number" 
          min="1"
          class="input" 
          placeholder="Введите сумму"
        >
      </fieldset>
    </form>
  {/if}

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
