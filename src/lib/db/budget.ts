"use server";

import prisma from "@/lib/prisma";

// 指定した月の予算を取得する
export const getMonthBudgets = async (
  userId: string,
  firstDay: Date,
  lastDay: Date
) => {
  return await prisma.budget.findMany({
    where: {
      year_month: {
        gte: firstDay,
        lt: lastDay,
      },
      userId: userId,
    },
  });
};
