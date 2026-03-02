import * as d3 from "../../_node/d3@7.9.0/index.afc3d751.js";
import {
  nodes, edges, nodeMap,
  getNeighbors, getDegree,
  bfsWavefronts, probabilisticBfs,
} from "./networkData.8cc857a3.js";
import {
  COLORS, resetNetwork,
  showCounter, hideCounter, addLabel,
} from "./networkRenderer.ee10e723.js";

const N = nodes.length;

// ============================================================
// Utility: run a BFS spread animation on the network
// Returns a cancel function.
// ============================================================

function animateSpread(net, waves, opts = {}) {
  const timeouts = [];
  const {
    waveDelay = 500,
    seedColor = COLORS.nodeSeed,
    activeColor = COLORS.nodeActive,
    edgeColor = COLORS.edgeActive,
    onDone = null,
  } = opts;

  const seedIds = waves[0];

  // Color seed nodes immediately
  net.nodeSel
    .filter((d) => seedIds.includes(d.id))
    .attr("fill", seedColor)
    .attr("r", 9)
    .attr("filter", "url(#glow)");

  // Animate subsequent waves
  let delay = 400;
  const allVisited = new Set(seedIds);

  for (let w = 1; w < waves.length; w++) {
    const wave = waves[w];
    wave.forEach((id) => allVisited.add(id));
    const visited = new Set(allVisited);

    timeouts.push(setTimeout(() => {
      net.nodeSel
        .filter((d) => wave.includes(d.id))
        .transition().duration(350)
        .attr("fill", activeColor)
        .attr("r", 8);

      net.edgeSel
        .filter((d) => {
          const sIn = wave.includes(d.source);
          const tIn = wave.includes(d.target);
          return (sIn && visited.has(d.target))
              || (tIn && visited.has(d.source));
        })
        .transition().duration(350)
        .attr("stroke", edgeColor)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.6);
    }, delay));

    delay += waveDelay;
  }

  if (onDone) {
    timeouts.push(setTimeout(onDone, delay + 100));
  }

  return {
    cancel: () => timeouts.forEach(clearTimeout),
    totalDelay: delay,
    totalInfected: allVisited.size,
  };
}

// ============================================================
// Step 1: Network — build-up animation (nodes pop in one by one)
// ============================================================

export function step1_network(net) {
  const timeouts = [];

  // Start hidden
  net.nodeSel.attr("opacity", 0).attr("r", 0);
  net.edgeSel.attr("opacity", 0);

  // Pop in nodes one at a time
  const order = [...nodes];
  const appeared = new Set();

  order.forEach((n, i) => {
    timeouts.push(setTimeout(() => {
      net.nodeSel
        .filter((d) => d.id === n.id)
        .transition().duration(250)
        .attr("opacity", 1)
        .attr("r", 7);

      appeared.add(n.id);

      // Reveal edges where both endpoints are visible
      net.edgeSel
        .filter((d) =>
          appeared.has(d.source) && appeared.has(d.target)
        )
        .transition().duration(200)
        .attr("opacity", 1)
        .attr("stroke-opacity", 0.8);
    }, i * 90));
  });

  return () => {
    timeouts.forEach(clearTimeout);
    // Show full network on cleanup
    net.nodeSel.interrupt().attr("opacity", 1).attr("r", 7);
    net.edgeSel.interrupt().attr("opacity", 1).attr("stroke-opacity", 0.8);
  };
}

// ============================================================
// Step 2: Contagion — probabilistic spread from one node
// ============================================================

export function step2_contagion(net) {
  const timeouts = [];
  let spreadCancel = null;
  let running = true;

  function run() {
    if (!running) return;
    resetNetwork(net);

    // Pulse the seed node
    net.nodeSel
      .filter((d) => d.id === "a3")
      .attr("fill", COLORS.nodeSeed)
      .attr("r", 10)
      .attr("filter", "url(#glow)");

    // Brief pause, then spread
    timeouts.push(setTimeout(() => {
      if (!running) return;
      const { waves, totalInfected } = probabilisticBfs(
        ["a3"], 0.55, 42
      );
      const result = animateSpread(net, waves, {
        waveDelay: 550,
        onDone: () => {
          showCounter(net, totalInfected, N);
          timeouts.push(setTimeout(() => {
            if (!running) return;
            resetNetwork(net);
            timeouts.push(setTimeout(run, 600));
          }, 2500));
        },
      });
      spreadCancel = result.cancel;
    }, 600));
  }

  run();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    if (spreadCancel) spreadCancel();
    resetNetwork(net);
  };
}

// ============================================================
// Step 3: Whom to infect? — compare two seeds
// ============================================================

export function step3_compare(net) {
  const timeouts = [];
  let spreadCancel = null;
  let running = true;

  // c7 is peripheral in C; a9 bridges A↔B
  function runPeripheral() {
    if (!running) return;
    resetNetwork(net);
    addLabel(net, "c7", "peripheral", {
      color: COLORS.failure, fontSize: "10px",
    });

    const { waves, totalInfected } = bfsWavefronts(["c7"], 3);
    const result = animateSpread(net, waves, {
      waveDelay: 500,
      seedColor: COLORS.failure,
      activeColor: COLORS.failure,
      edgeColor: COLORS.failure,
      onDone: () => {
        showCounter(net, totalInfected, N);
        timeouts.push(setTimeout(() => {
          if (running) runBridge();
        }, 2800));
      },
    });
    spreadCancel = result.cancel;
  }

  function runBridge() {
    if (!running) return;
    resetNetwork(net);
    addLabel(net, "a9", "bridge", {
      color: COLORS.success, fontSize: "10px",
    });

    const { waves, totalInfected } = bfsWavefronts(["a9"]);
    const result = animateSpread(net, waves, {
      waveDelay: 450,
      seedColor: COLORS.success,
      activeColor: COLORS.success,
      edgeColor: COLORS.success,
      onDone: () => {
        showCounter(net, totalInfected, N);
        timeouts.push(setTimeout(() => {
          if (running) runPeripheral();
        }, 2800));
      },
    });
    spreadCancel = result.cancel;
  }

  runPeripheral();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    if (spreadCancel) spreadCancel();
    resetNetwork(net);
  };
}

// ============================================================
// Step 4: Influence maximization — 3-seed optimal spread
// ============================================================

export function step4_infmax(net) {
  const timeouts = [];
  let spreadCancel = null;
  let running = true;

  const seeds = ["a9", "b6", "c3"]; // one per bridge region

  function run() {
    if (!running) return;
    resetNetwork(net);

    seeds.forEach((s, i) => {
      timeouts.push(setTimeout(() => {
        if (!running) return;
        net.nodeSel.filter((d) => d.id === s)
          .transition().duration(300)
          .attr("fill", COLORS.nodeSeed)
          .attr("r", 10)
          .attr("filter", "url(#glow)");
        addLabel(net, s, `seed ${i + 1}`, {
          color: COLORS.nodeSeed, fontSize: "9px",
        });
      }, i * 300));
    });

    timeouts.push(setTimeout(() => {
      if (!running) return;
      const { waves, totalInfected } = bfsWavefronts(seeds);
      const res = animateSpread(net, waves, {
        waveDelay: 400,
        onDone: () => {
          showCounter(net, totalInfected, N);
          timeouts.push(setTimeout(() => {
            if (running) run();
          }, 3500));
        },
      });
      spreadCancel = res.cancel;
    }, 1200));
  }

  run();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    if (spreadCancel) spreadCancel();
    resetNetwork(net);
  };
}

// ============================================================
// Step 5: How do we solve it — cycle candidate sets
// ============================================================

export function step5_candidates(net) {
  const timeouts = [];
  let spreadCancel = null;
  let running = true;

  // Use probabilistic BFS with different RNG seeds to get varied outcomes
  // Bad placements: clustered seeds with low spread
  // Good placements: diverse seeds with higher spread
  const sets = [
    { seeds: ["a0", "a3", "a6"], label: "All in one cluster", bad: true, rng: 10 },
    { seeds: ["a9", "b6", "c3"], label: "Spread across", bad: false, rng: 42 },
    { seeds: ["b0", "b3", "b7"], label: "All in one cluster", bad: true, rng: 15 },
    { seeds: ["a3", "a9", "c4"], label: "Diverse placement", bad: false, rng: 55 },
  ];

  let idx = 0;

  function show() {
    if (!running) return;
    resetNetwork(net);
    const c = sets[idx % sets.length];
    const color = c.bad ? COLORS.failure : COLORS.success;
    // Lower probability for clustered seeds, moderate for diverse
    const prob = c.bad ? 0.35 : 0.5;

    net.nodeSel
      .filter((d) => c.seeds.includes(d.id))
      .transition().duration(300)
      .attr("fill", color)
      .attr("r", 10)
      .attr("filter", "url(#glow)");

    // Use probabilistic BFS for varied outbreak sizes
    const { waves, totalInfected } = probabilisticBfs(c.seeds, prob, c.rng);

    timeouts.push(setTimeout(() => {
      if (!running) return;
      const result = animateSpread(net, waves, {
        waveDelay: 400,
        seedColor: color,
        activeColor: color,
        edgeColor: color,
        onDone: () => {
          showCounter(net, totalInfected, N);

          net.overlayG.selectAll(".cand-label").remove();
          net.overlayG.append("text")
            .attr("class", "cand-label")
            .attr("x", net.W / 2)
            .attr("y", net.H - 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "13px")
            .attr("font-weight", "600")
            .attr("font-family", "system-ui, sans-serif")
            .attr("fill", color)
            .text(c.label);

          idx++;
          timeouts.push(setTimeout(show, 2500));
        },
      });
      spreadCancel = result.cancel;
    }, 500));
  }

  show();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    if (spreadCancel) spreadCancel();
    resetNetwork(net);
  };
}

// ============================================================
// Step 6: Greedy — round-by-round selection
// ============================================================

export function step6_greedy(net) {
  const timeouts = [];
  let spreadCancel = null;
  let running = true;

  const picks = ["a9", "b3", "c4"];

  function run() {
    if (!running) return;
    resetNetwork(net);
    let cumDelay = 0;

    picks.forEach((pick, phase) => {
      // Phase label
      timeouts.push(setTimeout(() => {
        if (!running) return;
        net.overlayG.selectAll(".phase-label").remove();
        net.overlayG.append("text")
          .attr("class", "phase-label")
          .attr("x", net.W / 2).attr("y", 28)
          .attr("text-anchor", "middle")
          .attr("font-size", "13px")
          .attr("font-weight", "600")
          .attr("font-family", "system-ui, sans-serif")
          .attr("fill", COLORS.textDark)
          .attr("opacity", 0)
          .text(`Round ${phase + 1}: evaluating...`)
          .transition().duration(200)
          .attr("opacity", 1);
      }, cumDelay));

      // Quick scan across nodes
      const already = picks.slice(0, phase);
      const candidates = nodes.filter(
        (n) => !already.includes(n.id)
      );
      candidates.forEach((n, i) => {
        timeouts.push(setTimeout(() => {
          if (!running) return;
          net.nodeSel
            .filter((d) => d.id === n.id)
            .attr("fill", COLORS.nodeScanning)
            .transition().duration(50)
            .attr("fill", COLORS.nodeDefault);
        }, cumDelay + 300 + i * 40));
      });

      cumDelay += 300 + candidates.length * 40 + 200;

      // Select the winner
      timeouts.push(setTimeout(() => {
        if (!running) return;
        net.nodeSel.filter((d) => d.id === pick)
          .transition().duration(300)
          .attr("fill", COLORS.nodeSeed)
          .attr("r", 10)
          .attr("filter", "url(#glow)");
        addLabel(net, pick, `#${phase + 1}`, {
          color: COLORS.nodeSeed,
        });
      }, cumDelay));

      cumDelay += 700;
    });

    // Final spread
    timeouts.push(setTimeout(() => {
      if (!running) return;
      net.overlayG.selectAll(".phase-label").remove();
      const { waves, totalInfected } = bfsWavefronts(picks);
      const res = animateSpread(net, waves, {
        waveDelay: 350,
        onDone: () => {
          showCounter(net, totalInfected, N);
          timeouts.push(setTimeout(() => {
            if (running) run();
          }, 3500));
        },
      });
      spreadCancel = res.cancel;
    }, cumDelay));
  }

  run();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    if (spreadCancel) spreadCancel();
    resetNetwork(net);
  };
}

// ============================================================
// Step 7: GA intro — show evolving population of seed sets
// ============================================================

export function step7_gaIntro(net) {
  const timeouts = [];
  let running = true;

  // 4 "chromosomes" (seed sets) that evolve
  const generations = [
    [["a0","a4","a8"], ["b1","b5","c9"], ["a3","c7","b0"], ["c3","c6","c9"]],
    [["a0","a4","a7"], ["b1","b6","c9"], ["a3","c0","b0"], ["c3","c4","c9"]],
    [["a0","a7","a9"], ["b1","b6","c2"], ["a3","c0","b3"], ["c3","c4","b6"]],
    [["a9","a7","b9"], ["b6","b3","c2"], ["a9","c0","b3"], ["a9","c4","b6"]],
  ];

  const popX = 70;
  const popY = net.H - 80;

  let gen = 0;

  function showGeneration() {
    if (!running) return;
    resetNetwork(net);

    const pop = generations[gen % generations.length];

    // Draw population panel
    net.overlayG.selectAll(".pop").remove();
    const g = net.overlayG.append("g").attr("class", "pop");

    g.append("text")
      .attr("x", popX).attr("y", popY - 15)
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("font-family", "system-ui, sans-serif")
      .attr("fill", COLORS.textDark)
      .text(`Generation ${gen + 1}`);

    pop.forEach((seeds, row) => {
      seeds.forEach((sid, col) => {
        g.append("circle")
          .attr("cx", popX + col * 22)
          .attr("cy", popY + row * 20)
          .attr("r", 7)
          .attr("fill", COLORS.nodeSeed)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
        g.append("text")
          .attr("x", popX + col * 22)
          .attr("y", popY + row * 20 + 3)
          .attr("text-anchor", "middle")
          .attr("font-size", "6px")
          .attr("fill", "#fff")
          .attr("font-weight", "600")
          .text(sid);
      });
    });

    // Highlight best chromosome on the network
    const best = pop[pop.length - 1]; // last is "best"
    net.nodeSel.filter((d) => best.includes(d.id))
      .transition().duration(400)
      .attr("fill", COLORS.nodeSeed)
      .attr("r", 10)
      .attr("filter", "url(#glow)");

    gen++;
    timeouts.push(setTimeout(showGeneration, 2200));
  }

  showGeneration();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    resetNetwork(net);
  };
}

// ============================================================
// Step 8: Standard (random) mutation — dotted lines jumping
// ============================================================

export function step8_randomMutation(net) {
  const timeouts = [];
  let running = true;

  const seeds = ["a3", "b3", "c4"];
  // Random mutation: b3 jumps to c9 (far away)
  const from = "b3";
  const to = "c9";

  function run() {
    if (!running) return;
    resetNetwork(net);

    // Show seeds
    net.nodeSel.filter((d) => seeds.includes(d.id))
      .attr("fill", COLORS.nodeSeed)
      .attr("r", 9)
      .attr("filter", "url(#glow)");

    seeds.forEach((s) =>
      addLabel(net, s, "seed", {
        color: COLORS.nodeSeed, fontSize: "9px",
      })
    );

    // Label
    timeouts.push(setTimeout(() => {
      if (!running) return;

      net.overlayG.selectAll(".mut-label").remove();
      net.overlayG.append("text")
        .attr("class", "mut-label")
        .attr("x", net.W / 2).attr("y", net.H - 12)
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .attr("font-family", "system-ui, sans-serif")
        .attr("fill", COLORS.failure)
        .attr("opacity", 0)
        .text("Standard mutation: random swap")
        .transition().duration(300)
        .attr("opacity", 1);

      // Fade out the mutated node
      net.nodeSel.filter((d) => d.id === from)
        .transition().duration(400)
        .attr("fill", COLORS.failure)
        .attr("r", 5)
        .attr("opacity", 0.4);

      // Draw dotted line from → to
      const pFrom = nodeMap.get(from);
      const pTo = nodeMap.get(to);

      net.overlayG.append("line")
        .attr("class", "mut-arrow")
        .attr("x1", pFrom.x).attr("y1", pFrom.y)
        .attr("x2", pFrom.x).attr("y2", pFrom.y)
        .attr("stroke", COLORS.failure)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "6,4")
        .attr("marker-end", "url(#arrow-red)")
        .transition().duration(700)
        .attr("x2", pTo.x).attr("y2", pTo.y);

      timeouts.push(setTimeout(() => {
        if (!running) return;
        net.nodeSel.filter((d) => d.id === to)
          .transition().duration(300)
          .attr("fill", COLORS.failure)
          .attr("r", 10);
        addLabel(net, to, "random pick", {
          color: COLORS.failure, fontSize: "9px",
        });
      }, 800));
    }, 1200));

    // Show resulting spread (bad)
    timeouts.push(setTimeout(() => {
      if (!running) return;
      resetNetwork(net);
      const newSeeds = seeds.map((s) => (s === from ? to : s));
      const { waves, totalInfected } = bfsWavefronts(newSeeds, 3);

      animateSpread(net, waves, {
        waveDelay: 400,
        seedColor: COLORS.failure,
        activeColor: COLORS.failure,
        edgeColor: COLORS.failure,
        onDone: () => {
          showCounter(net, totalInfected, N);
          net.overlayG.selectAll(".mut-label").remove();
          net.overlayG.append("text")
            .attr("class", "mut-label")
            .attr("x", net.W / 2).attr("y", net.H - 12)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "600")
            .attr("font-family", "system-ui, sans-serif")
            .attr("fill", COLORS.failure)
            .text("Two seeds stuck in same cluster!");
          timeouts.push(setTimeout(() => {
            if (running) run();
          }, 3000));
        },
      });
    }, 3500));
  }

  run();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    resetNetwork(net);
  };
}

// ============================================================
// Step 9: Neighbor-hop mutation — walk along edges
// ============================================================

export function step9_neighborHop(net) {
  const timeouts = [];
  let running = true;

  const seeds = ["a3", "b3", "c4"];
  // Neighbor-hop: b3 → b6 (neighbor, which bridges to C)
  const from = "b3";
  const hopTo = "b6";

  function run() {
    if (!running) return;
    resetNetwork(net);

    // Show seeds
    net.nodeSel.filter((d) => seeds.includes(d.id))
      .attr("fill", COLORS.nodeSeed)
      .attr("r", 9)
      .attr("filter", "url(#glow)");

    seeds.forEach((s) =>
      addLabel(net, s, "seed", {
        color: COLORS.nodeSeed, fontSize: "9px",
      })
    );

    // Label
    timeouts.push(setTimeout(() => {
      if (!running) return;

      net.overlayG.selectAll(".mut-label").remove();
      net.overlayG.append("text")
        .attr("class", "mut-label")
        .attr("x", net.W / 2).attr("y", net.H - 12)
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .attr("font-family", "system-ui, sans-serif")
        .attr("fill", COLORS.success)
        .attr("opacity", 0)
        .text("Neighbor-hop: walk along an edge")
        .transition().duration(300)
        .attr("opacity", 1);

      // Fade mutated node
      net.nodeSel.filter((d) => d.id === from)
        .transition().duration(400)
        .attr("fill", COLORS.success)
        .attr("r", 5)
        .attr("opacity", 0.5);

      // Solid line along edge from → hopTo
      const pFrom = nodeMap.get(from);
      const pTo = nodeMap.get(hopTo);

      net.overlayG.append("line")
        .attr("class", "mut-arrow")
        .attr("x1", pFrom.x).attr("y1", pFrom.y)
        .attr("x2", pFrom.x).attr("y2", pFrom.y)
        .attr("stroke", COLORS.success)
        .attr("stroke-width", 2.5)
        .attr("marker-end", "url(#arrow-green)")
        .transition().duration(400)
        .attr("x2", pTo.x).attr("y2", pTo.y);

      timeouts.push(setTimeout(() => {
        if (!running) return;
        net.nodeSel.filter((d) => d.id === hopTo)
          .transition().duration(300)
          .attr("fill", COLORS.success)
          .attr("r", 10)
          .attr("filter", "url(#glow)");
        addLabel(net, hopTo, "1-hop neighbor", {
          color: COLORS.success, fontSize: "9px",
        });
      }, 500));
    }, 1200));

    // Show resulting spread (good — b6 bridges to C)
    timeouts.push(setTimeout(() => {
      if (!running) return;
      resetNetwork(net);
      const newSeeds = seeds.map((s) => (s === from ? hopTo : s));
      const { waves, totalInfected } = bfsWavefronts(newSeeds);

      animateSpread(net, waves, {
        waveDelay: 400,
        seedColor: COLORS.success,
        activeColor: COLORS.success,
        edgeColor: COLORS.success,
        onDone: () => {
          showCounter(net, totalInfected, N);
          net.overlayG.selectAll(".mut-label").remove();
          net.overlayG.append("text")
            .attr("class", "mut-label")
            .attr("x", net.W / 2).attr("y", net.H - 12)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "600")
            .attr("font-family", "system-ui, sans-serif")
            .attr("fill", COLORS.success)
            .text("Better bridge coverage!");
          timeouts.push(setTimeout(() => {
            if (running) run();
          }, 3000));
        },
      });
    }, 3500));
  }

  run();

  return () => {
    running = false;
    timeouts.forEach(clearTimeout);
    resetNetwork(net);
  };
}
