<script lang="ts">
  // api запрос и вытащить все валюты

  let currencies = ['USD', 'EUR', 'RUR'];

  let selectedCurrency1 = "";
  let selectedCurrency2 = "";
  let sum1: number;
  let sum2: number;
</script>

<main>
  <h1>Конвертер валют</h1>

  <p class="how-to">
    Выберите две валюты из выпадающих списков и введите сумму валюты, которую
    необходимо сконвертировать.
  </p>

  <form class="inputs-container">
    <fieldset class="fieldset">
      <select bind:value={selectedCurrency1} on:change={() => (sum1 = 0)}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
      <input
        bind:value={sum1}
        disabled='{selectedCurrency1 == "" && selectedCurrency2 == ""}'
        type="number"
        class="input"
        placeholder="Введите сумму"
      >
    </fieldset>

    <fieldset class="fieldset">
      <select bind:value={selectedCurrency2} on:change={() => (sum2 = 0)}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
      <input
        bind:value={sum2}
        disabled='{selectedCurrency1 == "" && selectedCurrency2 == ""}'
        type="number" 
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
