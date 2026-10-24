/**
 * @file apps/api/src/common/pagination/connection.factory.ts
 * @description Generic TypeScript factory generating Relay-compliant Edge and Connection ObjectTypes.
 * @module @vitalai/api/common
 */

import { type Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { PageInfo } from "./page-info.dto";

export interface IEdge<T> {
  cursor: string;
  node: T;
}

export interface IConnection<T> {
  edges: IEdge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function createConnection<TNode>(
  nodeRef: Type<TNode>,
  name: string,
): Type<IConnection<TNode>> {
  @ObjectType(`${name}Edge`)
  class Edge implements IEdge<TNode> {
    @Field(() => String, { description: "Opaque cursor identifying this node" })
    cursor!: string;

    @Field(() => nodeRef, { description: "Underlying domain entity node" })
    node!: TNode;
  }

  @ObjectType(`${name}Connection`)
  class Connection implements IConnection<TNode> {
    @Field(() => [Edge], { description: "List of paginated edges" })
    edges!: Edge[];

    @Field(() => PageInfo, { description: "Cursor navigation metadata" })
    pageInfo!: PageInfo;

    @Field(() => Number, { description: "Total count of records matching query" })
    totalCount!: number;
  }

  return Connection;
}
