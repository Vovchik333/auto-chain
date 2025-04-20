const getDaysAgo = (timestamp: number): number => {
  const now = Date.now();
  const txTime = timestamp * 1000; // Converting seconds to milliseconds
  const diff = now - txTime;
  const millisecondsInDay = 1000 * 60 * 60 * 24;

  const daysAgo = Math.floor(diff / millisecondsInDay);
  
  return daysAgo;
}

export { getDaysAgo };
