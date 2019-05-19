import { letterXPosition, letterYPosition } from './utils'

const LetterConfig = {
  A: {
    translate3d: [
      letterXPosition(1088),
      letterYPosition(404),
      0,
    ],
    scale: 1,
  },
  K: {
    translate3d: [
      letterXPosition(753),
      letterYPosition(700),
      0,
    ],
    scale: 1,
  },
  e: {
    translate3d: [
      letterXPosition(75),
      letterYPosition(150),
      0,
    ],
    scale: 0.4,
  },
  3: {
    translate3d: [
      letterXPosition(783),
      letterYPosition(160),
      0,
    ],
    scale: 1,
  },
  M: {
    translate3d: [
      letterXPosition(1364),
      letterYPosition(164),
      0,
    ],
    scale: 0.4,
  },
}

export default LetterConfig
