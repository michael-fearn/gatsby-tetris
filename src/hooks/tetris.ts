import React, { useState, useEffect, useCallback } from "react"

import { useTetriminos, ITetrimino } from "../hooks/tetriminos"
import { Coordinate } from "../types"
import { useCoordinates } from "../hooks/coordinates"
import { useMovement } from "../hooks/movement"
import { useBindings } from "./bindings"

export const shiftCoordinate = (
  coordinate: Coordinate,
  shift: Coordinate
): Coordinate => [coordinate[0] + shift[0], coordinate[1] + shift[1]]

export const shiftCoordinates = (
  coordinates: Coordinate[],
  shift: Coordinate
): Coordinate[] => {
  return coordinates.map(coordinate => {
    return shiftCoordinate(coordinate, shift)
  })
}

export const positionTetrimino = (
  tetrimino: ITetrimino,
  brickPosition: Coordinate
) => {
  return {
    ...tetrimino,
    coordinates: shiftCoordinates(tetrimino.coordinates, brickPosition),
  }
}

export const useTetris = (initialDimensions: [number, number]) => {
  const [dimensions, setDimensions] = useState(initialDimensions)
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

  const [gameTicker, setGameTicker] = useState(0)
  const [speed, setSpeed] = useState(30)

  const increaseSpeed = useCallback(
    (rowsRemoved: number) => {
      setSpeed(speed - 2 * rowsRemoved)
    },
    [speed]
  )

  const getNextTetrimino = useCallback(() => {
    const rowsRemoved = addStationaryCoordinates(() => {
      replaceCurrentTetrimino()
      gotoDefaultBrickPosition()
    })

    increaseSpeed(rowsRemoved)
  }, [addStationaryCoordinates, replaceCurrentTetrimino, increaseSpeed])

  const bindings = [
    { key: "ArrowDown", fn: moveDown },
    { key: "ArrowLeft", fn: moveLeft },
    { key: "ArrowRight", fn: moveRight },
    { key: "w", fn: rotateClockwise },
    { key: "q", fn: rotateCounterClockwise },
  ]

  useBindings(bindings)

  useEffect(() => {
    if (!(gameTicker % speed)) {
      moveDown(getNextTetrimino)
    }
  }, [gameTicker, speed])

  useEffect(() => {
    setTimeout(() => setGameTicker(gameTicker + 1), 10) // divisible by 10
  }, [gameTicker])

  useEffect(() => {})
  // useEffect(() => {
  //   const gameTimer = setInterval(() => {
  //     moveDown(getNextTetrimino)
  //     // setBrickPosition(shiftCoordinate(brickPosition, [1, 0]))
  //   }, 100)
  //   return () => {
  //     clearInterval(gameTimer)
  //   }
  // }, [brickPosition, getNextTetrimino])

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
    speed,
    moveDown,
    reset,
    rotateClockwise,
    rotateCounterClockwise,
  }
}
