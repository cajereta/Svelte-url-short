<script>
  import Copy from "./Copy.svelte";
  export let url;
</script>

<button>
  <Copy
    text={url}
    let:copy
    on:copy={() => {
      console.log({ url });
    }}
  >
    <button on:click={copy}>
      <span style:width="15px" style:display="inline-block" /></button
    >
  </Copy>
</button>

<style>
</style>
