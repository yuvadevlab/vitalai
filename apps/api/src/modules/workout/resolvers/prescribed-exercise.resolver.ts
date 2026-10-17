/**
 * @file apps/api/src/modules/workout/resolvers/prescribed-exercise.resolver.ts
 * @description Field resolver for PrescribedExercise using batch DataLoaders to eliminate N+1 queries.
 * @module @vitalai/api/workout
 */

import { Resolver, ResolveField, Parent, Context } from "@nestjs/graphql";
import { type VitalGraphQLContext } from "../../../common/dataloaders/dataloader.types";
import { PrescribedExerciseResponse, SetLogResponse } from "../dto";

@Resolver(() => PrescribedExerciseResponse)
export class PrescribedExerciseResolver {
  @ResolveField(() => [SetLogResponse], {
    description: "Batched set logs retrieved in a single query via DataLoader",
  })
  async sets(
    @Parent() exercise: PrescribedExerciseResponse,
    @Context() ctx: VitalGraphQLContext,
  ): Promise<SetLogResponse[]> {
    if (exercise.sets && exercise.sets.length > 0) {
      return exercise.sets;
    }
    const sets = await ctx.loaders.setsByExerciseIdLoader.load(exercise.id);
    return sets.map((s) => ({
      id: s.id,
      setNumber: s.setNumber,
      targetReps: s.targetReps,
      actualReps: s.actualReps,
      targetRir: s.targetRir,
      actualRir: s.actualRir,
      weightKg: s.weightKg,
      completed: s.completed,
      restSeconds: s.restSeconds,
      completedAt: s.completedAt ? s.completedAt.toISOString() : null,
    }));
  }
}
