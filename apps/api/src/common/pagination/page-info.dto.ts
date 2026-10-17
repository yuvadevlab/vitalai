/**
 * @file apps/api/src/common/pagination/page-info.dto.ts
 * @description Relay-compliant PageInfo GraphQL ObjectType for bidirectional pagination.
 * @module @vitalai/api/common
 */

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Relay-compliant cursor pagination navigation metadata" })
export class PageInfo {
  @Field(() => Boolean, { description: "Whether additional nodes exist after this page" })
  hasNextPage!: boolean;

  @Field(() => Boolean, { description: "Whether prior nodes exist before this page" })
  hasPreviousPage!: boolean;

  @Field(() => String, {
    nullable: true,
    description: "First cursor in the current connection slice",
  })
  startCursor?: string | null;

  @Field(() => String, {
    nullable: true,
    description: "Last cursor in the current connection slice",
  })
  endCursor?: string | null;
}
