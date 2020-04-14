import React, { useState, useEffect, useCallback } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Board } from "../components/board"
import { useTetriminos, ITetrimino } from "../hooks/tetriminos"

import { useCoordinates } from "../hooks/coordinates"
import { useMovement } from "../hooks/movement"

// function useMovement(activeBlock: BaseBlock) {}

function useTetris(dimensions: [number, number]) {
  const [brickPosition, setBrickPosition] = useState<[number, number]>([
    1,
    Math.floor(dimensions[1] / 2 + 1),
  ])
  const {
    activeTetrimino,
    setActiveTetrimino,
    nextTetrimino,
    replaceCurrentTetrimino,
  } = useTetriminos(dimensions)

  // const [positionedTetrimino, setPositionedTetrimino] = useState<ITetrimino>({
  //   color: activeTetrimino.color,
  //   coordinates: activeTetrimino.coordinates.map(coordinate => [
  //     brickPosition[0] + coordinate[0],
  //     brickPosition[1] + coordinate[1],
  //   ]),
  // })

  // useEffect(() => {
  //   setPositionedTetrimino({
  //     color: activeTetrimino.color,
  //     coordinates: activeTetrimino.coordinates.map(coordinate => [
  //       brickPosition[0] + coordinate[0],
  //       brickPosition[1] + coordinate[1],
  //     ]),
  //   })
  // }, [activeTetrimino, brickPosition])
  // // const positionedTetrimino = useCallback(() => {
  // return  as ITetrimino
  // }, [activeTetrimino, brickPosition])

  const {
    allCoordinates,
    stationaryBrickCoordinates,
    addStationaryCoordinates,
  } = useCoordinates(activeTetrimino, dimensions)

  const {
    moveDown,
    moveLeft,
    moveRight,
    rotateClockwise,
    rotateCounterClockwise,
  } = useMovement(
    activeTetrimino,
    setActiveTetrimino,
    dimensions,
    stationaryBrickCoordinates
  )

  return {
    allCoordinates,
    dimensions,
    activeTetrimino,
    rotateClockwise,
    brickPosition,
    setBrickPosition,
    moveLeft,
    moveRight,
    moveDown,
    rotateCounterClockwise,
    replaceCurrentTetrimino,
    addStationaryCoordinates,
  }
}

const IndexPage = () => {
  const {
    allCoordinates,
    dimensions,
    brickPosition,
    moveLeft,
    moveRight,
    setBrickPosition,
    rotateCounterClockwise,
    rotateClockwise,
    moveDown,
    addStationaryCoordinates,
  } = useTetris([16, 6])

  // const allCoordinates = {}
  // const dimensions: [number, number] = [5, 5]
  return (
    <div>
      <Board dimensions={dimensions} points={allCoordinates} />
      <button onClick={rotateClockwise}>Clockwise</button>
      <button onClick={rotateCounterClockwise}>CounterClockwise</button>
      <button onClick={addStationaryCoordinates}>RemoveAffectedRows</button>
      <button onClick={() => moveDown(() => {})}>Move Down</button>
      <button onClick={moveLeft}>left</button>
      <button onClick={moveRight}>moveRight</button>
    </div>
  )
}

export default IndexPage
