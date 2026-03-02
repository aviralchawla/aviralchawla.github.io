// ============================================================
// Network graph data: ~30 nodes in 3 communities
// ============================================================

// Community A (top-left, 10 nodes) centered ~(150, 140)
// Community B (top-right, 10 nodes) centered ~(450, 140)
// Community C (bottom-center, 10 nodes) centered ~(300, 390)

export const nodes = [
  // Community A
  { id: "a0", x: 90,  y: 80,  community: "A" },
  { id: "a1", x: 150, y: 65,  community: "A" },
  { id: "a2", x: 200, y: 95,  community: "A" },
  { id: "a3", x: 130, y: 130, community: "A" }, // hub node
  { id: "a4", x: 70,  y: 140, community: "A" },
  { id: "a5", x: 185, y: 155, community: "A" },
  { id: "a6", x: 110, y: 190, community: "A" },
  { id: "a7", x: 165, y: 205, community: "A" },
  { id: "a8", x: 55,  y: 195, community: "A" },
  { id: "a9", x: 225, y: 170, community: "A" }, // bridge toward B

  // Community B
  { id: "b0", x: 390, y: 75,  community: "B" },
  { id: "b1", x: 450, y: 60,  community: "B" },
  { id: "b2", x: 505, y: 90,  community: "B" },
  { id: "b3", x: 420, y: 130, community: "B" }, // hub node
  { id: "b4", x: 485, y: 135, community: "B" },
  { id: "b5", x: 540, y: 155, community: "B" },
  { id: "b6", x: 400, y: 190, community: "B" },
  { id: "b7", x: 460, y: 195, community: "B" },
  { id: "b8", x: 520, y: 200, community: "B" },
  { id: "b9", x: 375, y: 160, community: "B" }, // bridge toward A

  // Community C
  { id: "c0", x: 240, y: 320, community: "C" },
  { id: "c1", x: 310, y: 305, community: "C" },
  { id: "c2", x: 370, y: 325, community: "C" },
  { id: "c3", x: 260, y: 370, community: "C" },
  { id: "c4", x: 330, y: 365, community: "C" },
  { id: "c5", x: 390, y: 380, community: "C" },
  { id: "c6", x: 230, y: 420, community: "C" },
  { id: "c7", x: 300, y: 430, community: "C" }, // peripheral
  { id: "c8", x: 370, y: 425, community: "C" },
  { id: "c9", x: 300, y: 470, community: "C" },
];

export const edges = [
  // Community A — dense
  { source: "a0", target: "a1" },
  { source: "a0", target: "a3" },
  { source: "a0", target: "a4" },
  { source: "a1", target: "a2" },
  { source: "a1", target: "a3" },
  { source: "a2", target: "a3" },
  { source: "a2", target: "a5" },
  { source: "a3", target: "a4" },
  { source: "a3", target: "a5" },
  { source: "a3", target: "a6" },
  { source: "a3", target: "a7" }, // a3 degree = 7 (hub)
  { source: "a4", target: "a6" },
  { source: "a4", target: "a8" },
  { source: "a5", target: "a7" },
  { source: "a5", target: "a9" },
  { source: "a6", target: "a7" },
  { source: "a6", target: "a8" },
  { source: "a7", target: "a9" },

  // Community B — dense
  { source: "b0", target: "b1" },
  { source: "b0", target: "b3" },
  { source: "b1", target: "b2" },
  { source: "b1", target: "b3" },
  { source: "b2", target: "b3" },
  { source: "b2", target: "b4" },
  { source: "b3", target: "b4" },
  { source: "b3", target: "b6" },
  { source: "b3", target: "b9" }, // b3 degree = 6 (hub)
  { source: "b4", target: "b5" },
  { source: "b4", target: "b7" },
  { source: "b5", target: "b7" },
  { source: "b5", target: "b8" },
  { source: "b6", target: "b7" },
  { source: "b6", target: "b9" },
  { source: "b7", target: "b8" },

  // Community C — dense
  { source: "c0", target: "c1" },
  { source: "c0", target: "c3" },
  { source: "c1", target: "c2" },
  { source: "c1", target: "c4" },
  { source: "c2", target: "c4" },
  { source: "c2", target: "c5" },
  { source: "c3", target: "c4" },
  { source: "c3", target: "c6" },
  { source: "c4", target: "c5" },
  { source: "c4", target: "c7" },
  { source: "c5", target: "c8" },
  { source: "c6", target: "c7" },
  { source: "c6", target: "c9" },
  { source: "c7", target: "c8" },
  { source: "c7", target: "c9" },
  { source: "c8", target: "c9" },

  // Bridge edges — 1 per pair of communities
  { source: "a9", target: "b9" }, // A ↔ B
  { source: "a7", target: "c0" }, // A ↔ C
  { source: "b6", target: "c2" }, // B ↔ C
];

// ============================================================
// Adjacency map
// ============================================================

const adjacency = new Map();
nodes.forEach((n) => adjacency.set(n.id, []));
edges.forEach((e) => {
  adjacency.get(e.source).push(e.target);
  adjacency.get(e.target).push(e.source);
});

export function getNeighbors(id) {
  return adjacency.get(id) || [];
}

export function getDegree(id) {
  return (adjacency.get(id) || []).length;
}

// ============================================================
// BFS spread — deterministic wavefronts
// ============================================================

export function bfsWavefronts(seedIds, maxWaves = Infinity) {
  const visited = new Set(seedIds);
  const waves = [seedIds.slice()];
  let frontier = seedIds.slice();
  let wave = 0;

  while (frontier.length > 0 && wave < maxWaves) {
    const next = [];
    for (const nid of frontier) {
      for (const nb of getNeighbors(nid)) {
        if (!visited.has(nb)) {
          visited.add(nb);
          next.push(nb);
        }
      }
    }
    if (next.length > 0) waves.push(next);
    frontier = next;
    wave++;
  }

  return { waves, totalInfected: visited.size };
}

// ============================================================
// Probabilistic BFS — each edge transmits with probability p
// Uses a fixed seed (deterministic) so replay looks the same
// ============================================================

export function probabilisticBfs(seedIds, p = 0.5, rngSeed = 42) {
  // Simple seeded RNG (mulberry32)
  let s = rngSeed | 0;
  function rand() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const visited = new Set(seedIds);
  const waves = [seedIds.slice()];
  let frontier = seedIds.slice();

  while (frontier.length > 0) {
    const next = [];
    for (const nid of frontier) {
      for (const nb of getNeighbors(nid)) {
        if (!visited.has(nb) && rand() < p) {
          visited.add(nb);
          next.push(nb);
        }
      }
    }
    if (next.length === 0) break;
    waves.push(next);
    frontier = next;
  }

  return { waves, totalInfected: visited.size };
}

// Node map for quick coordinate lookup
export const nodeMap = new Map(nodes.map((n) => [n.id, n]));
