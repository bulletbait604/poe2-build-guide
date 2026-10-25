"use client";

import { getRoute, treeSource, type TreeNode } from "@/content/treeRoute";
import { useEffect, useMemo, useRef, useState } from "react";

type Placed = TreeNode & { sx: number; sy: number; index: number; kind: "start" | "path" | "fork" };

function place(routeKey: string) {
  const route = getRoute(routeKey);
  const cloud = [route.start, ...route.nodes, ...route.forks];
  const minX = Math.min(...cloud.map((node) => node.x));
  const maxX = Math.max(...cloud.map((node) => node.x));
  const minY = Math.min(...cloud.map((node) => node.y));
  const maxY = Math.max(...cloud.map((node) => node.y));
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const size = 920;
  const project = (node: TreeNode, index: number, kind: Placed["kind"]): Placed => ({
    ...node,
    index,
    kind,
    sx: ((node.x - minX) / span) * size + 48,
    sy: ((node.y - minY) / span) * size + 48,
  });
  return {
    start: project(route.start, -1, "start"),
    path: route.nodes.map((node, index) => project(node, index, "path")),
    forks: route.forks.map((node, index) => project(node, index, "fork")),
    size: size + 96,
  };
}

export function TreeMap({ routeKey, owned }: { routeKey: string; owned: number }) {
  const layout = useMemo(() => place(routeKey), [routeKey]);
  const frame = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 12, y: 12 });
  const [scale, setScale] = useState(0.7);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const [active, setActive] = useState<string | null>(layout.path[0]?.id ?? null);

  useEffect(() => {
    const box = frame.current?.getBoundingClientRect();
    const fit = box ? Math.min(box.width / layout.size, box.height / layout.size) : 0.7;
    setScale(Math.max(0.35, fit * 0.96));
    setOffset({ x: 12, y: 12 });
    setActive(layout.path[Math.min(owned, layout.path.length - 1)]?.id ?? null);
  }, [layout, owned, routeKey]);

  const nodes = [layout.start, ...layout.forks, ...layout.path];
  const selected =
    nodes.find((node) => node.id === active && node.kind !== "fork") ??
    nodes.find((node) => node.id === active) ??
    layout.path[0];

  function zoom(delta: number) {
    setScale((value) => Math.min(2.4, Math.max(0.35, value + delta)));
  }

  return (
    <section className="mt-8 border border-line bg-panel p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-parchment">Passive path</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
            Drag the map. Use the buttons to zoom. Gold nodes are the ones to have at your level. The ember node is
            the next point. Grey nodes are forks this route does not take. The layout is the {treeSource.patch} tree.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="border border-line px-3 py-2 text-gold" onClick={() => setOffset((value) => ({ ...value, x: value.x + 80 }))}>
            Pan
          </button>
          <button type="button" className="border border-line px-3 py-2 text-gold" onClick={() => zoom(-0.15)} aria-label="Zoom out">
            −
          </button>
          <button type="button" className="border border-line px-3 py-2 text-gold" onClick={() => zoom(0.15)} aria-label="Zoom in">
            +
          </button>
        </div>
      </div>
      <div
        ref={frame}
        role="application"
        aria-label="Passive path map"
        tabIndex={0}
        className="mt-4 h-80 cursor-grab touch-none overflow-hidden border border-line bg-ink active:cursor-grabbing sm:h-[28rem]"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
          setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onWheel={(event) => {
          event.preventDefault();
          zoom(event.deltaY < 0 ? 0.08 : -0.08);
        }}
      >
        <svg width="100%" height="100%" role="img" aria-label="Passive path for this build">
          <g transform={`translate(${offset.x} ${offset.y}) scale(${scale})`}>
            {layout.forks.map((node) => {
              const from = layout.path.find((step) => Math.hypot(step.sx - node.sx, step.sy - node.sy) < 70) ?? layout.start;
              return (
                <line
                  key={`fork-line-${node.id}`}
                  x1={from.sx}
                  y1={from.sy}
                  x2={node.sx}
                  y2={node.sy}
                  stroke="#3a3128"
                  strokeWidth="2"
                />
              );
            })}
            {layout.path.map((node, index) => {
              const previous = index === 0 ? layout.start : layout.path[index - 1];
              const taken = node.index < owned;
              return (
                <line
                  key={`line-${node.id}`}
                  x1={previous.sx}
                  y1={previous.sy}
                  x2={node.sx}
                  y2={node.sy}
                  stroke={taken ? "#e4c48a" : "#4a3b2a"}
                  strokeWidth={taken ? 4 : 3}
                />
              );
            })}
            {layout.forks.map((node) => (
              <circle key={`fork-${node.id}`} cx={node.sx} cy={node.sy} r={node.notable ? 7 : 4} fill="#241c16" stroke="#6a5844" strokeWidth="1.5" />
            ))}
            <circle cx={layout.start.sx} cy={layout.start.sy} r="16" fill="#e4c48a" />
            <text x={layout.start.sx} y={layout.start.sy + 30} textAnchor="middle" fill="#b5a58f" fontSize="13">
              {layout.start.name}
            </text>
            {layout.path.map((node) => {
              const taken = node.index < owned;
              const next = node.index === owned;
              const radius = node.notable ? 13 : 7;
              return (
                <g
                  key={node.id}
                  onPointerEnter={() => setActive(node.id)}
                  onClick={() => setActive(node.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={node.sx} cy={node.sy} r={radius + 8} fill="transparent" />
                  <circle
                    cx={node.sx}
                    cy={node.sy}
                    r={radius}
                    fill={taken ? "#e4c48a" : "#1c1712"}
                    stroke={next ? "#e07a3d" : "#e4c48a"}
                    strokeWidth={next ? 4 : 2}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      {selected ? (
        <div className="mt-3 border border-gold/50 bg-ink p-3 text-sm leading-6">
          <p className="font-display text-base text-parchment">{selected.name}</p>
          <p className="text-muted">{selected.stat || "A travel node on the way to the next notable."}</p>
        </div>
      ) : null}
      <p className="mt-2 text-xs leading-5 text-muted">
        Positions are the {treeSource.patch} passive tree export from Grinding Gear Games. This route stays on nodes
        connected to your class start.
      </p>
    </section>
  );
}
