<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import matter from "matter-js";
  const { Engine, Runner, Render, Composite, World, MouseConstraint, Mouse } = matter;

  import Card from "./Card.svelte";

  let element: HTMLElement;
  let engine: matter.Engine = Engine.create();
  let world: matter.World = engine.world;
  let runner: matter.Runner = Runner.create();
  let render: matter.Render;

  onMount(() => {
    engine.gravity.y = 0;

    render = Render.create({
      element,
      engine,
      options: {
        width: element.clientWidth,
        height: element.clientHeight,
        wireframes: false,
        background: "transparent"
      },
    });
    Render.run(render);

    Runner.run(runner, engine);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.01,
        damping: 0.1,
        render: {
          visible: false,
        },
      },
    });

    World.add(world, mouseConstraint);
  });

  onDestroy(() => {
    Runner.stop(runner);
    Engine.clear(engine);

    Composite.clear(world, false);

    // Remove renderer and canvas
    Render.stop(render);
    render.canvas.remove();
    render.textures = {};
  });
</script>

<div
  class="dotted-background border-3 rounded-md border-stone-800 grow w-full relative"
  bind:this={element}
>
  <Card {world} {engine} />
</div>
