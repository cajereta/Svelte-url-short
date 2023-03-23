<script>
  export let ref = null;
  import FaClipboard from "svelte-icons/fa/FaClipboard.svelte";
  import Copy from "./Copy.svelte";
</script>

{#if ref != 0}
  <div class="url-container">
    <a href={ref}>
      <slot />
    </a>
    <Copy
      text={ref}
      let:copy
      on:copy={() => {
        console.log("copado");
      }}
    >
      <button on:click={copy}>
        <span style:width="15px" style:display="inline-block">
          <FaClipboard />
        </span></button
      >
    </Copy>
  </div>
{/if}

<style>
  .url-container {
    display: flex;
    align-items: center;
    background-color: var(--color-selected);
    border-radius: 10px;
    margin: 0px 0 10px 0;
    padding: 5px 10px;
    max-width: 600px;
  }
  a {
    display: flex;
    flex: 1;
    margin: 0 20px;
    align-items: center;
    gap: 70px;
    color: var(--color-background);
  }
  @media (min-width: 768px) {
  }
</style>
