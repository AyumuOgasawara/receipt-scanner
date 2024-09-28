type StartAndEndOfMonth = {
  firstDay: Date
  lastDay: Date
}

// 本日の日付を取得(UTC)
export const getToday = ():Date => {
  return new Date()
} 

// 月の初日と最終日を返す
export const getStartAndEndOfMonth = (date: Date):StartAndEndOfMonth => {
  // UTCで表示される
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { firstDay, lastDay };
};
