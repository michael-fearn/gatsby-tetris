import React, { useState, useEffect, useCallback } from "react"

import { Board } from "../components/board"
import { useTetris, shiftCoordinates } from "../hooks/tetris"
import { Coordinate, CoordinateDictionary } from "../types"

const IndexPage = () => {
  const [dimensions, setDimensions] = useState<Coordinate>([16, 10])

  const {
    allCoordinates,
    tetriminoToCoords,
    nextTetrimino,
    shiftCoordinates,
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
      <div style={{ display: "flex" }}>
        <div>
          <h4>Next Block</h4>
          <Board
            dimensions={[4, 4]}
            points={tetriminoToCoords({
              color: nextTetrimino.color,
              coordinates: shiftCoordinates(nextTetrimino.coordinates, [1, 1]),
            })}
          />
        </div>
        <Board dimensions={dimensions} points={allCoordinates} />
      </div>
      <br />
      <h3>Blocks move every {speed}0/ms</h3>
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
