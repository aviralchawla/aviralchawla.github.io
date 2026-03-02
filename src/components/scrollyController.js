import scrollama from "scrollama";
import { resetNetwork } from "./networkRenderer.js";
import {
  step1_network,
  step2_contagion,
  step3_compare,
  step4_infmax,
  step5_candidates,
  step6_greedy,
  step7_gaIntro,
  step8_randomMutation,
  step9_neighborHop,
} from "./networkAnimations.js";

export function initScrollytelling(container, network) {
  const scroller = scrollama();
  let currentCleanup = null;

  // Steps 0-8 = narrative (no intro "Ready" step)
  const animations = [
    step1_network,
    step2_contagion,
    step3_compare,
    step4_infmax,
    step5_candidates,
    step6_greedy,
    step7_gaIntro,
    step8_randomMutation,
    step9_neighborHop,
  ];

  const steps = container.querySelectorAll(".scrolly-text .step");

  function onEnter(response) {
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }

    steps.forEach((el, i) => {
      el.classList.toggle("is-active", i === response.index);
    });

    const fn = animations[response.index];
    if (fn) currentCleanup = fn(network);
  }

  scroller
    .setup({
      step: ".scrolly-text .step",
      offset: 0.45,
      debug: false,
    })
    .onStepEnter(onEnter);

  window.addEventListener("resize", () => scroller.resize());

  resetNetwork(network);

  return () => {
    if (currentCleanup) currentCleanup();
    scroller.destroy();
  };
}
