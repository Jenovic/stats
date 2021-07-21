export default (averageScoreSum: number, totalModulesStudiedSum: number) => {
  let totalAverageScore = 0;

  if (totalModulesStudiedSum > 0) {
    totalAverageScore =
      Math.round((averageScoreSum / totalModulesStudiedSum) * 100) / 100;
  }

  return totalAverageScore;
};
