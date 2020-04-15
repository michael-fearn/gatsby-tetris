import React, { useState, useEffect, useCallback } from "react"

import { useTetriminos, ITetrimino } from "../hooks/tetriminos"
import { Coordinate } from "../types"
import { useCoordinates } from "../hooks/coordinates"
import { useMovement, shiftCoordinate } from "../hooks/movement"

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
    reset,
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

  const gotoDefaultBrickPosition = useCallback(() => {
    setBrickPosition([1, Math.floor(dimensions[1] / 2 + 1)])
  }, [])

  const getNextTetrimino = useCallback(
    () =>
      addStationaryCoordinates(() => {
        replaceCurrentTetrimino()
        gotoDefaultBrickPosition()
      }),
    [addStationaryCoordinates, replaceCurrentTetrimino]
  )

  useEffect(() => {
    const gameTimer = setInterval(() => {
      moveDown(getNextTetrimino)
      // setBrickPosition(shiftCoordinate(brickPosition, [1, 0]))
    }, 800)
    return () => {
      clearInterval(gameTimer)
    }
  }, [brickPosition, getNextTetrimino])

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
    reset,
    rotateClockwise,
    rotateCounterClockwise,
  }
}
