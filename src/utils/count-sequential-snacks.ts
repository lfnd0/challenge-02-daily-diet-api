export function countSequentialSnacksWithDietFlag(snacks: Snack[]) {
  let sequentialCount = 0
  let bestSnackSequence = 0

  for (let i = 0; i < snacks.length; i++) {
    if (snacks[i].is_in_diet === 1) {
      sequentialCount++
      bestSnackSequence = Math.max(bestSnackSequence, sequentialCount)
    } else {
      sequentialCount = 0
    }
  }

  return { bestSnackSequence }
}
