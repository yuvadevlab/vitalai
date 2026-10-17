/**
 * @file packages/database/src/repositories/user.repository.ts
 * @description User persistence operations with strict user scoping.
 * @module @vitalai/database
 */

import { prisma, type PrismaClient } from "../client";
import type { Prisma, User } from "@prisma/client";

export class UserRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async updateProfile(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.db.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateEquipmentSelection(
    userId: string,
    availableEquipment: string[],
    isHomeGym: boolean,
  ): Promise<User> {
    return this.db.user.update({
      where: { id: userId },
      data: {
        availableEquipment,
        isHomeGym,
      },
    });
  }
}
