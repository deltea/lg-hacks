<script lang="ts">
  import { onMount } from "svelte";
  import matter from "matter-js";
  const { World, Engine, Bodies, Events } = matter;

  let { world, engine }: {
    world: matter.World,
    engine: matter.Engine
  } = $props();
  let element: HTMLElement;

  onMount(() => {
    const bounds = element.getBoundingClientRect();

    const rect = Bodies.rectangle(50, 40, bounds.width, bounds.height, {
      density: 0.5,
      frictionAir: 0.05,
      chamfer: { radius: 10 },
    });

    World.add(world, rect);

    Events.on(engine, "afterUpdate", () =>{
      const { x, y } = rect.position;
      element.style.left = `${x - bounds.width / 2}px`;
      element.style.top = `${y - bounds.height / 2}px`;
    });
  });
</script>

<div bind:this={element} class="absolute">
  <p>heyyyyyyy<br>wefoijqwoiejfoiqwjkeoifj</p>
</div>
