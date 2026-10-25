"use client";

import { useRef, useState } from "react";

type Node = { id: number; x: number; y: number; text: string; notable: boolean };

function layout(points: string[]): Node[] {
  return points.map((text, index) => {
    const notable = text.length < 42 && !text.startsWith("The ") && !text.startsWith("A ") && !text.startsWith("Another") && !text.startsWith("That ") && !text.startsWith("Stay ");
    const defence = /evasion|armour|energy shield|life|goring|chakra|behemoth|buffer|blur|polished|relentless|sturdy|resilient|recovery|devoted|freedom|escape|catlike|mist|awareness|flow|pure energy|dampening|melding|insight|heavy/i.test(
      text,
    );
    const column = Math.floor(index / 2);
    return {
      id: index,
      x: 70 + column * 108,
      y: defence ? 250 : 90,
      text,
      notable,
    };
  });
}

export function TreeMap({ points, owned }: { points: string[]; owned: number }) {
  const nodes = layout(points);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mt-8 border border-line bg-panel p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-parchment">Passive path</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
            Drag the map. Scroll to zoom. Gold nodes are the ones to have at your level. The upper line is damage.
            The lower line is life and defence. Each node is the next point, in order, from your class start.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="border border-line px-3 py-1 text-gold" onClick={() => setOffset((value) => ({ ...value, x: value.x + 140 }))}>
            Pan
          </button>
          <button type="button" className="border border-line px-3 py-1 text-gold" onClick={() => setScale((value) => Math.max(0.6, value - 0.15))}>
            −
          </button>
          <button type="button" className="border border-line px-3 py-1 text-gold" onClick={() => setScale((value) => Math.min(1.8, value + 0.15))}>
            +
          </button>
        </div>
      </div>
      <div
        role="application"
        aria-label="Passive path map"
        tabIndex={0}
        className="mt-4 h-[28rem] cursor-grab overflow-hidden border border-line bg-ink active:cursor-grabbing"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          setOffset({
            x: drag.current.ox + event.clientX - drag.current.x,
            y: drag.current.oy + event.clientY - drag.current.y,
          });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onWheel={(event) => {
          event.preventDefault();
          setScale((value) => Math.min(1.8, Math.max(0.6, value + (event.deltaY < 0 ? 0.08 : -0.08))));
        }}
      >
        <svg width="100%" height="100%" role="img" aria-label="Passive path for this build">
          <g transform={`translate(${offset.x} ${offset.y}) scale(${scale})`}>
            {nodes.slice(1).map((node, index) => {
              const previous = nodes[index];
              return (
                <line
                  key={`line-${node.id}`}
                  x1={previous.x}
                  y1={previous.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.id < owned ? "#e4c48a" : "#4a3b2a"}
                  strokeWidth="3"
                />
              );
            })}
            <circle cx="36" cy="170" r="16" fill="#e4c48a" />
            <text x="36" y="198" textAnchor="middle" fill="#b5a58f" fontSize="11">
              Start
            </text>
            {nodes[0] ? <line x1="52" y1="170" x2={nodes[0].x - 18} y2={nodes[0].y} stroke="#e4c48a" strokeWidth="3" /> : null}
            {nodes.map((node) => {
              const taken = node.id < owned;
              const radius = node.notable ? 16 : 9;
              return (
                <g key={node.id} onPointerEnter={() => setActive(node.id)} onPointerLeave={() => setActive(null)}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={taken ? "#e4c48a" : "#1c1712"}
                    stroke="#e4c48a"
                    strokeWidth="2"
                  />
                  {active === node.id ? (
                    <foreignObject x={node.x - 110} y={node.y - 78} width="220" height="70">
                      <div className="border border-gold bg-ink p-2 text-xs leading-4 text-parchment">
                        {node.text}
                      </div>
                    </foreignObject>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </section>
  );
}
