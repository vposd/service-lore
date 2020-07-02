class FlattenNode<T> {
  id?: string;
  parentId?: string;
  level?: number;
  children?: T[];
}

export function makeTree<T extends FlattenNode<T>>(
  collection: T[],
  index?: string
) {
  const list = [...(collection || [])];
  const map = {};
  const roots: T[] = [];
  const parentIndex = index ? index : 'parentId';

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].children = [];
    list[i].level = 0;
  }

  for (const node of list) {
    if (list[map[node[parentIndex]]] && node.id !== node[parentIndex]) {
      node.level = (list[map[node[parentIndex]]].level || 0) + 1;
      list[map[node[parentIndex]]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
