import * as d3 from "../../_node/d3@7.9.0/index.afc3d751.js";
import { nodes, edges, nodeMap } from "./networkData.8cc857a3.js";

// ============================================================
// Color palette
// ============================================================

export const COLORS = {
  nodeDefault:  "#d1d5db",
  nodeActive:   "#3b82f6",
  nodeSeed:     "#1d4ed8",
  nodeScanning: "#fbbf24",
  edgeDefault:  "#e5e7eb",
  edgeActive:   "#3b82f6",
  failure:      "#ef4444",
  success:      "#22c55e",
  textMuted:    "#6b7280",
  textDark:     "#1f2937",
};

// ============================================================
// Create the SVG network — returns a "network" API object
// ============================================================

export function createNetwork(container) {
  const W = 600;
  const H = 510;

  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "100%");

  // --- defs: glow filter + arrow markers ---
  const defs = svg.append("defs");

  const glow = defs.append("filter").attr("id", "glow");
  glow.append("feGaussianBlur")
    .attr("stdDeviation", "3")
    .attr("result", "blur");
  const merge = glow.append("feMerge");
  merge.append("feMergeNode").attr("in", "blur");
  merge.append("feMergeNode").attr("in", "SourceGraphic");

  addArrowMarker(defs, "arrow-red", COLORS.failure);
  addArrowMarker(defs, "arrow-green", COLORS.success);

  // --- layers ---
  const edgeG   = svg.append("g").attr("class", "edges");
  const nodeG   = svg.append("g").attr("class", "nodes");
  const labelG  = svg.append("g").attr("class", "labels");
  const overlayG = svg.append("g").attr("class", "overlay");

  // --- draw edges ---
  const edgeSel = edgeG.selectAll("line")
    .data(edges)
    .join("line")
    .attr("x1", (d) => nodeMap.get(d.source).x)
    .attr("y1", (d) => nodeMap.get(d.source).y)
    .attr("x2", (d) => nodeMap.get(d.target).x)
    .attr("y2", (d) => nodeMap.get(d.target).y)
    .attr("stroke", COLORS.edgeDefault)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.8);

  // --- draw nodes ---
  const nodeSel = nodeG.selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 7)
    .attr("fill", COLORS.nodeDefault)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5);

  // --- counter text (top-right) ---
  const counter = overlayG.append("text")
    .attr("x", W - 20)
    .attr("y", 30)
    .attr("text-anchor", "end")
    .attr("font-size", "16px")
    .attr("font-weight", "700")
    .attr("font-family", "system-ui, sans-serif")
    .attr("fill", COLORS.textDark)
    .attr("opacity", 0);

  return {
    svg, nodeSel, edgeSel,
    labelG, overlayG, counter,
    W, H,
  };
}

// ============================================================
// Reset everything to default gray
// ============================================================

export function resetNetwork(net) {
  net.nodeSel
    .interrupt()
    .attr("r", 7)
    .attr("fill", COLORS.nodeDefault)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("filter", null)
    .attr("opacity", 1);

  net.edgeSel
    .interrupt()
    .attr("stroke", COLORS.edgeDefault)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.8)
    .attr("stroke-dasharray", null);

  net.labelG.selectAll("*").remove();
  net.overlayG.selectAll("*").remove();
  // Re-add the counter text element
  net.counter = net.overlayG.append("text")
    .attr("x", net.W - 20)
    .attr("y", 30)
    .attr("text-anchor", "end")
    .attr("font-size", "16px")
    .attr("font-weight", "700")
    .attr("font-family", "system-ui, sans-serif")
    .attr("fill", COLORS.textDark)
    .attr("opacity", 0);
}

// ============================================================
// Show / hide the infection counter
// ============================================================

export function showCounter(net, infected, total) {
  net.counter
    .text(`${infected} / ${total} reached`)
    .attr("opacity", 0)
    .transition().duration(300)
    .attr("opacity", 1);
}

export function hideCounter(net) {
  net.counter.attr("opacity", 0);
}

// ============================================================
// Add a text label near a node
// ============================================================

export function addLabel(net, nodeId, text, opts = {}) {
  const node = nodeMap.get(nodeId);
  const {
    offsetY = -16,
    color = COLORS.textDark,
    fontSize = "11px",
  } = opts;

  return net.labelG.append("text")
    .attr("x", node.x)
    .attr("y", node.y + offsetY)
    .attr("text-anchor", "middle")
    .attr("font-size", fontSize)
    .attr("font-weight", "600")
    .attr("font-family", "system-ui, sans-serif")
    .attr("fill", color)
    .attr("opacity", 0)
    .text(text)
    .transition().duration(300)
    .attr("opacity", 1);
}

// ============================================================
// Helpers
// ============================================================

function addArrowMarker(defs, id, color) {
  defs.append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 5).attr("refY", 5)
    .attr("markerWidth", 4).attr("markerHeight", 4)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", color);
}
