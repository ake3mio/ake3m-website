const BASE_WIDTH = 1632
const BASE_HEIGHT = 948

export function normaliseToUnit (base, vpx, unit) {
  const value = ((100 / base) * vpx)
  return value + unit
}

export function letterXPosition (vpx) {
  return normaliseToUnit(BASE_WIDTH, vpx, 'vw')
}

export function letterYPosition (vpx) {
  return normaliseToUnit(BASE_HEIGHT, vpx, 'vh')
}
