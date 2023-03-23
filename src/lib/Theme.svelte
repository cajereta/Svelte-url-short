<script>
  let themeName = `Dark`;
  let DarkTheme = true;

  const changeHandler = () => {
    DarkTheme ? (themeName = `Light`) : (themeName = `Dark`);
    !DarkTheme;
  };
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="./{themeName}-theme.css" />
</svelte:head>

<main>
  <!-- <h1>Select a theme:</h1>

  <select bind:value={themeName}>
    <option value="Light">Light</option>
    <option value="Dark">Dark</option>
  </select> -->
  <div class="selector">
    <label for="theme">Enable {DarkTheme ? "light" : "dark"} mode</label>
    <div class="container">
      <label class="switch">
        <input
          id="theme"
          type="checkbox"
          bind:checked={DarkTheme}
          on:click={changeHandler}
        />
        <span class="slider round" />
      </label>
    </div>
  </div>
</main>

<style src="./{themeName}-theme.css">
  main {
    color: #ccc;
  }
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 16px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-slider);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .selector {
    position: absolute;
    top: 10px;
    right: 30px;
    display: inline-grid;
    flex-direction: column;
    justify-items: center;
    color: var(--color-main-text);
  }
  .container {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>
