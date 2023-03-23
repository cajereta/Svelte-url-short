<script>
  import axios from "axios";
  import Theme from "./lib/Theme.svelte";

  // import "src/assets/Light-theme.css";
  // import "src/assets/Dark-theme.css";

  import FaRegHandScissors from "svelte-icons/fa/FaRegHandScissors.svelte";

  import { writable } from "svelte/store";
  import List from "./lib/List.svelte";

  let urlList = [];
  let originalUrlList = [];
  let isLoading = false;
  let isError = false;

  const storedLinks = localStorage.getItem("links");
  const storedOriginalLinks = localStorage.getItem("o-links");
  let content = `Copied!`;
  let url;
  if (storedLinks) {
    urlList = JSON.parse(storedLinks);
  }
  if (storedOriginalLinks) {
    originalUrlList = JSON.parse(storedOriginalLinks);
  }
  let shortedUrl;
  let originalUrl;

  async function handleSubmit() {
    isError = false;
    isLoading = true;
    await axios
      .get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then(async (response) => {
        if (response) {
          shortedUrl = response.data.result.full_short_link;
          originalUrl = response.data.result.original_link;
          originalUrlList = [...originalUrlList, originalUrl];
          urlList = [...urlList, shortedUrl];

          const storedUrl = writable(storedLinks);
          storedUrl.subscribe((value) => {
            localStorage.setItem("links", (value = JSON.stringify(urlList)));
          });
          const storedOriginalUrl = writable(storedOriginalLinks);
          storedOriginalUrl.subscribe((value) => {
            localStorage.setItem(
              "o-links",
              (value = JSON.stringify(originalUrlList))
            );
          });
        }
      })
      .catch(function (error) {
        isError = true;
      });

    isLoading = false;
    copyShortURL();
    url = "";
  }

  async function copyShortURL() {
    await navigator.clipboard.writeText(shortedUrl);
  }
</script>

<Theme />

<form
  class="form-container"
  on:submit|preventDefault={handleSubmit}
  on:submit={copyShortURL}
>
  <input type="url" placeholder="Paste your url here!" bind:value={url} />
  <!-- <Copy
    let:copy
    on:copy={async (text) => {
      try {
        await navigator.clipboard.writeText(shortedUrl);
        console.log(navigator.clipboard.writeText(shortedUrl));
      } catch (e) {
        console.log(e);
      }
    }}
    text={shortedUrl}
  >
    <button on:click={copy}>
      
    </button>
  </Copy> -->

  <button on:click={copyShortURL} style:display="inline-block">
    {#if isLoading}
      {#if isError}
        {"There has been an error"}
      {/if}
      {content}
    {:else}
      <span style:width="17px" style:display="inline-block">
        <FaRegHandScissors />
      </span>
    {/if}
  </button>
</form>
{#if isError}{"There has been an error"}{/if}
<div class="list-container">
  {#each [...urlList].reverse() as url, index}
    <List ref={url}
      ><p>{originalUrlList[originalUrlList.length - index - 1]}</p>
      <span class="shorturl">{url}</span></List
    >
  {/each}
</div>

<style>
  input {
    padding: 15px;
    width: 511px;
    border-radius: 10px;
    border: 1px transparent var(--color-slider);
    margin-right: 10px;
    background-color: var(--color-background);
    color: var(--color-main-text);
  }
  form {
    display: flex;
    padding: 9px;
  }
  p {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  span {
    align-items: center;
  }
  button {
    justify-content: center;
  }
  .form-container {
    background-color: var(--color-selected);
    border-radius: 10px;
    margin-bottom: 10px;
    max-width: 600px;
  }

  @media (max-width: 768px) {
    input {
      width: 500px;
    }
  }
  @media (max-width: 300px) {
    input {
      width: 300px;
    }
  }
  div.list-container {
    max-height: 300px;
    width: 650px;
    overflow: auto;
  }
  .shorturl {
    text-decoration: underline;
  }
</style>
