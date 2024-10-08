"use server";

import {
  getMonthExpensesWithCategory,
  updateExpense,
  deleteExpense,
} from "@/lib/db";
import { RowType } from "@/_components/features/expenses/type";
import { formatStrDate } from "@/utils/time";

export const getAndFormatExpenses = async (
  userId: string,
  firstDay: Date,
  lastDay: Date
): Promise<RowType[]> => {
  const monthExpensesWithCate = await getMonthExpensesWithCategory(
    userId,
    firstDay,
    lastDay
  );

  // 出費を特定のフォーマットにする
  const rows = monthExpensesWithCate.map((expense) => ({
    expense_id: expense.id,
    date: expense.date,
    storeName: expense.storeName,
    amount: expense.amount,
    category_id: expense.categoryId,
    category: expense.category.name,
  }));
  return rows;
};

// 特定の出費を更新する
export const updateSelectedExpense = async (
  expenseId: string,
  dateStr: string,
  storeName: string,
  amount: number,
  categoryId: number
) => {
  const date = formatStrDate(dateStr);
  if (date === undefined) {
    throw new Error("The date is invalid");
  }
  try {
    await updateExpense(expenseId, amount, storeName, date, categoryId);
  } catch (error) {
    throw error;
  }
};

// 特定の出費を削除する
export const deleteSelectedExpense = async (expenseId: string) => {
  try {
    await deleteExpense(expenseId);
  } catch (error) {
    throw error;
  }
};
