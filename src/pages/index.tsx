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
    moveRight,
    moveDown,
    rotateCounterClockwise,
    replaceCurrentTetrimino,
    addStationaryCoordinates, // for testing
  } = useTetris(dimensions)

  const setBrickCallback = useCallback(() => {
    replaceCurrentTetrimino()
    setBrickPosition([1, Math.floor(dimensions[1] / 2 + 1)])
  }, [])

  useEffect(() => {
    const down = event => (event.key === "ArrowDown" ? moveDown() : null)
    const left = event => (event.key === "ArrowLeft" ? moveLeft() : null)
    const right = event => (event.key === "ArrowRight" ? moveRight() : null)
    const clockwise = event => (event.key === "w" ? rotateClockwise() : null)
    const counterClockwise = event =>
      event.key === "q" ? rotateCounterClockwise() : null
    window.addEventListener("keydown", down)
    window.addEventListener("keydown", left)
    window.addEventListener("keydown", right)
    window.addEventListener("keydown", clockwise)
    window.addEventListener("keydown", counterClockwise)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keydown", left)
      window.removeEventListener("keydown", right)
      window.removeEventListener("keydown", clockwise)
      window.removeEventListener("keydown", counterClockwise)
    }
  }, [moveDown, moveLeft, moveRight, rotateClockwise, rotateCounterClockwise])

  return (
    <div>
      <Board dimensions={dimensions} points={allCoordinates} />
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
      <button onClick={rotateClockwise}>Clockwise</button>
      <button onClick={rotateCounterClockwise}>CounterClockwise</button>
      <br />
      <button onClick={moveLeft} onKeyDown={event => console.log(event)}>
        left
      </button>
      <button onClick={moveDown}>Move Down</button>
      <button onClick={moveRight}>moveRight</button>
      <br />
      <button onClick={replaceCurrentTetrimino}>Next Brick</button>
      <br />
      <button onClick={() => addStationaryCoordinates(setBrickCallback)}>
        Set Brick
      </button>
    </div>
  )
}

export default IndexPage
