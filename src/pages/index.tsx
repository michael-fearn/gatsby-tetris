import React, { useState, useEffect, useCallback } from "react"

import { Board } from "../components/board"
import { useTetris } from "../hooks/tetris"
import { Coordinate } from "../types"

const IndexPage = () => {
  const [dimensions, setDimensions] = useState<Coordinate>([16, 10])

  const {
    allCoordinates,
    nextTetrimino,
    activeTetrimino,
    setBrickPosition,
    rotateClockwise,
    moveLeft,
    reset,
    moveRight,
    moveDown,
    speed,
    rotateCounterClockwise,
    replaceCurrentTetrimino,
    addStationaryCoordinates, // for testing
  } = useTetris(dimensions)

  return (
    <div>
      <Board dimensions={dimensions} points={allCoordinates} />
      <br />
      <h3>Block Speed: {speed}</h3>
      <label htmlFor="">Height</label>
      <input
        type="number"
        value={dimensions[0]}
        onChange={event =>
          setDimensions([Number(event.target.value), dimensions[1]])
        }
      />
      <label htmlFor="">width</label>
      <input
        type="number"
        value={dimensions[1]}
        onChange={event =>
          setDimensions([dimensions[0], Number(event.target.value)])
        }
      />
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default IndexPage
