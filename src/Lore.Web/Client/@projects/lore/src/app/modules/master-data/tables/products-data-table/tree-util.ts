import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { isEmpty, cloneDeep } from 'lodash';

import { Product, ProductGroup } from '@contracts/master-data/product.class';

export enum ProductNodeType {
  Group,
  Sku,
}

export class ProductNodeBase {
  id: string;
  type: ProductNodeType;
  product?: Product;
  group?: ProductGroup;
}

export class ProductNode extends ProductNodeBase {
  _level: number;
  children: ProductNode[];
  products: ProductNode[];
}

export class ProductFlattenNode extends ProductNodeBase {
  level: number;
  hasChildren: boolean;
}

export const makeNodes = (
  groupsResults: ProductGroup[],
  productsResults: Product[]
) => {
  const groups = groupsResults.reduce(
    (groupsMap, g) =>
      groupsMap.set(
        g.id,
        Object.assign(new ProductNode(), {
          id: g.id,
          parentId: g.parent.id,
          type: ProductNodeType.Group,
          group: g,
          name: g.name,
          children: [],
        })
      ),
    new Map<string, ProductNode>()
  );

  const groupsNodes = productsResults.reduce(
    (groupsMap, p) =>
      groupsMap.set(
        p.group.id,
        Object.assign(groupsMap.get(p.group.id), {
          children: [
            ...groupsMap.get(p.group.id).children,
            Object.assign(new ProductNode(), {
              id: p.id,
              // parentId: p.group.id,
              type: ProductNodeType.Sku,
              product: p,
              name: p.name,
            }),
          ],
        })
      ),
    groups
  );

  return Array.from(groupsNodes.values());
};

export function makeTree<T extends ProductNode>(
  collection: T[],
  parentIndex = 'parentId'
) {
  const list = cloneDeep(collection || []);
  const _map = {};
  const roots: T[] = [];

  for (let i = 0; i < list.length; i += 1) {
    _map[list[i].id] = i;
    list[i].children = list[i].children || [];
    list[i]._level = 0;
  }

  for (const node of list) {
    if (list[_map[node[parentIndex]]] && node.id !== node[parentIndex]) {
      node._level = (list[_map[node[parentIndex]]]._level || 0) + 1;
      list[_map[node[parentIndex]]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

/** Function that maps a nested node to a flat node */
export const nodeTransformer = (
  node: ProductNode,
  level: number
): ProductFlattenNode => ({
  ...node,
  level,
  hasChildren: !isEmpty(node.children) || !isEmpty(node.products),
});

/** Function that gets a flat node's level */
export const getNodeLevel = ({ level }: ProductFlattenNode) => level;

/** Function that determines whether a flat node is expandable or not */
export const getIsNodeExpandable = ({ hasChildren }: ProductFlattenNode) =>
  hasChildren;

/** Function that returns a nested node's list of children */
export const getNodeChildren = ({ children, products }: ProductNode) => [
  ...children,
];

/** Returns parent node */
export const getParentNode = (
  treeControl: FlatTreeControl<ProductFlattenNode>
) => (node: ProductFlattenNode): ProductFlattenNode | null => {
  const currentLevel = node.level;

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = treeControl.dataNodes[i];

    if (currentNode.level < currentLevel) {
      return currentNode;
    }
  }
  return null;
};

export const createTreeFlattener = () =>
  new MatTreeFlattener<ProductNode, ProductFlattenNode>(
    nodeTransformer,
    getNodeLevel,
    getIsNodeExpandable,
    getNodeChildren
  );
