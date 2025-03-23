<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";
	import type { Tables } from "$lib/database.types";
  import Card from "$lib/components/Card.svelte";

  let whiteboardInsideElement: HTMLDivElement;
  let whiteboardElement: HTMLDivElement;
  // let isDragging = false;
  let mouseStart = { x: 0, y: 0 };
  let draggingElement: EventTarget | null;
  let cards: Tables<"cards">[] = [];
  let loadedCards: Tables<"cards">[] = [];

  onMount(async () => {
    const { data } = await supabase.from("cards").select("*");
    loadedCards = data ?? [];
    cards = loadedCards;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
  });

  function mouseDown(e: MouseEvent) {
    draggingElement = e.target;
    if (draggingElement instanceof HTMLElement) {
      if (getRootElement(draggingElement).classList.contains("card")) {
        getRootElement(draggingElement).style.pointerEvents = "none";
        getRootElement(draggingElement).style.zIndex = "100";
      }
    }

    mouseStart = { x: e.clientX, y: e.clientY };
  }

  function mouseUp(e: MouseEvent) {
    if (draggingElement instanceof HTMLElement) {
      // if (mouseStart.x === e.clientX && mouseStart.y === e.clientY) {
      // }
      if (getRootElement(draggingElement).classList.contains("card")) {
        getRootElement(draggingElement).style.pointerEvents = "auto";
        getRootElement(draggingElement).style.zIndex = "auto";
      }

      save();
    }

    draggingElement = null;
  }

  function mouseMove(e: MouseEvent) {
    if (!draggingElement) return;

    if (draggingElement instanceof HTMLElement) {
      if (draggingElement.classList.contains("whiteboard")) {
        whiteboardElement.scrollLeft += -e.movementX;
        whiteboardElement.scrollTop += -e.movementY;
      } else if (getRootElement(draggingElement).classList.contains("card")) {
        const element = getRootElement(draggingElement);
        const cardX = +element.style.left.slice(0, -2);
        const cardY = +element.style.top.slice(0, -2);

        const foundCard = cards.find((card) => card.id.toString() === element.id);
        if (foundCard) {
          foundCard.x = cardX + e.movementX;
          foundCard.y = cardY + e.movementY;
        }

        element.style.left = `${cardX + e.movementX}px`;
        element.style.top = `${cardY + e.movementY}px`;
      }
    }
  }

  async function save() {
    console.log("saving...");
    await supabase.from("cards").upsert(cards);
    console.log("saved!");
  }

  function scroll(e: WheelEvent) {
    whiteboardElement.scrollLeft += e.deltaX;
    whiteboardElement.scrollTop += e.deltaY;
  }

  function getRootElement(element: HTMLElement): HTMLElement {
    if (element.parentElement === whiteboardInsideElement) {
      return element;
    }

    if (element.parentElement === null) {
      return element;
    }

    return getRootElement(element.parentElement);
  }
</script>

<main class="flex flex-col h-full pl-4 pr-4 pb-4">
  <Nav />

  <div class="border-3 rounded-md border-stone-800 overflow-auto w-full" bind:this={whiteboardElement}>
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      on:wheel|preventDefault={scroll}
      bind:this={whiteboardInsideElement}
      class="dotted-background hover:cursor-grab active:cursor-grabbing w-[200rem] h-[200rem] relative whiteboard"
      role="main"
    >
      {#each cards as card}
        <Card loadedCard={card} />
      {/each}
    </div>
  </div>

  <footer class="flex justify-center items-center h-24">
    <button></button>
  </footer>
</main>
