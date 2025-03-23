<script lang="ts">
  import type { Tables } from "$lib/database.types";

  let { loadedCard }: { loadedCard: Tables<"cards"> } = $props();
  let isDragging = false;
  let cardElement: HTMLDivElement;
  let card = loadedCard;

  function mouseMove(e: MouseEvent) {
    // if (!isDragging) return;

    // const cardX = +cardElement.style.left.slice(0, -2);
    // const cardY = +cardElement.style.top.slice(0, -2);

    // cardElement.style.left = `${cardX + e.movementX}px`;
    // cardElement.style.top = `${cardY + e.movementY}px`;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="absolute card"
  style="left: {card.x}px; top: {card.y}px;"
  role="button"
  tabindex="0"
  bind:this={cardElement}
  id="{card.id.toString()}"
>
  {#if card.type === "text"}
    <div class="rounded-md p-4 bg-stone-800 card">
      <p>{card.content["text"]}</p>
    </div>
  {:else if card.type === "image"}
    <img
      src="{card.content["url"]}"
      alt="{card.content["text"]}"
      class="rounded-md"
      draggable="false"
    />
  {:else if card.type === "link"}
    <a href="{card.content["url"]}" class="rounded-md p-4 bg-stone-800 card w-full h-full block" draggable="false">
      <p>{card.content["text"]}</p>
    </a>
  {/if}
</div>
