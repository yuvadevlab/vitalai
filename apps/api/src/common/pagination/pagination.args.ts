/**
 * @file apps/api/src/common/pagination/pagination.args.ts
 * @description Relay-compliant connection arguments for forward and backward cursor pagination.
 * @module @vitalai/api/common
 */

import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 20, nullable: true, description: "Number of items to fetch" })
  first?: number;

  @Field(() => String, {
    nullable: true,
    description: "Opaque cursor after which to fetch results",
  })
  after?: string;
}
