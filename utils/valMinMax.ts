import { money } from './formatters'

export const valMinMax = (prices: number[]) => {
  return `${money.format(Math.min(...prices))} - ${money.format(
    Math.max(...prices)
  )}`
}
