import raw from "@/content/treeRoutes.json";

export type TreeNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  notable: boolean;
  stat: string;
};

export type TreeRoute = {
  start: TreeNode;
  nodes: TreeNode[];
  forks: TreeNode[];
};

type TreeFile = {
  source: string;
  patch: string;
  note: string;
  routes: Record<string, TreeRoute>;
};

const data = raw as TreeFile;

export const treeSource = {
  url: data.source,
  patch: data.patch,
  note: data.note,
};

export function getRoute(key: string): TreeRoute {
  return data.routes[key] ?? data.routes.ranger;
}
