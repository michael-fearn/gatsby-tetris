import React, { useState, useEffect, useCallback } from "react"

import { useTetriminos, ITetrimino } from "../hooks/tetriminos"
import { Coordinate } from "../types"
import { useCoordinates } from "../hooks/coordinates"
import { useMovement, positionTetrimino } from "../hooks/movement"

export const useTetris = (dimensions: [number, number]) => {
  const {
    activeTetrimino,
    setActiveTetrimino,
    nextTetrimino,
    replaceCurrentTetrimino,
  } = useTetriminos(dimensions)

  const [brickPosition, setBrickPosition] = useState<Coordinate>([
    1,
    Math.floor(dimensions[1] / 2 + 1),
  ])

  const {
    allCoordinates,
    stationaryBrickCoordinates,
    addStationaryCoordinates,
  } = useCoordinates(activeTetrimino, brickPosition, dimensions)

  const {
    moveDown,
    moveLeft,
    moveRight,
    rotateClockwise,
    rotateCounterClockwise,
  } = useMovement(
    activeTetrimino,
    setActiveTetrimino,
    brickPosition,
    setBrickPosition,
    dimensions,
    stationaryBrickCoordinates
  )

  return {
    dimensions,
    activeTetrimino,
    nextTetrimino,
    replaceCurrentTetrimino,
    allCoordinates,
    setBrickPosition,
    addStationaryCoordinates,
    moveLeft,
    moveRight,
    moveDown,
    rotateClockwise,
    rotateCounterClockwise,
  }
}
