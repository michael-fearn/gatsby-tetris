import { useState, useEffect, useCallback } from "react"
import { ITetrimino } from "./tetriminos"
import {
  Dimensions,
  CoordinateDictionary,
  CoordinateIndex,
  Coordinate,
} from "../types"

function shiftCoordinates(
  coordinates: Coordinate[],
  shift: Coordinate
): Coordinate[] {
  return coordinates.map(coordinate => {
    return [coordinate[0] + shift[0], coordinate[1] + shift[1]]
  })
}

function willCollide(
  coordinates: Coordinate[],
  dimensions: Dimensions,
  coordinateDict: CoordinateDictionary
) {
  return coordinates.some(
    ([posY, posX]) =>
      0 > posX && posX > dimensions[1] && coordinateDict[String([posY, posX])]
  )
}

const move = (
  tetrimino: ITetrimino,
  dimensions: Dimensions,
  coordinateDict: CoordinateDictionary,
  setActiveTetrimino: React.Dispatch<React.SetStateAction<ITetrimino>>
) => (shift: Coordinate, cb: Function = () => {}) => {
  const newPosition = shiftCoordinates(tetrimino.coordinates, shift)
  !willCollide(newPosition, dimensions, coordinateDict)
    ? setActiveTetrimino({ ...tetrimino, coordinates: newPosition })
    : cb()
}

const detectEnvironmentCollision = (
  dimensions: Dimensions,
  coordinatesDict: CoordinateDictionary
) => {
  return (coordinates: Coordinate[]) =>
    !willCollide(coordinates, dimensions, coordinatesDict)
}
const moveAndShift = (
  coordinates: Coordinate[],
  dimensions,
  coordinatesDict: CoordinateDictionary
) => {
  const canMove = detectEnvironmentCollision(dimensions, coordinatesDict)

  if (!canMove(coordinates)) {
    if (canMove(shiftCoordinates(coordinates, [0, 1]))) {
      return shiftCoordinates(coordinates, [0, 1])
    }
    if (canMove(shiftCoordinates(coordinates, [0, -1]))) {
      return shiftCoordinates(coordinates, [0, -1])
    }
  }
  return coordinates
}

export const useMovement = (
  tetrimino: ITetrimino,
  setActiveTetrimino: React.Dispatch<React.SetStateAction<ITetrimino>>,
  dimensions: Dimensions,
  coordinatesDict: CoordinateDictionary
) => {
  const rotateClockwise = useCallback(() => {
    const coordinates: Coordinate[] = tetrimino.coordinates.map(
      ([posY, posX]) => [posX, -posY]
    )
    const newCoordinates = moveAndShift(
      coordinates,
      dimensions,
      coordinatesDict
    )
    setActiveTetrimino({ ...tetrimino, coordinates: newCoordinates })
  }, [tetrimino])

  const rotateCounterClockwise = useCallback(() => {
    const coordinates: Coordinate[] = tetrimino.coordinates.map(
      ([posY, posX]) => [-posX, posY]
    )

    const newCoordinates = moveAndShift(
      coordinates,
      dimensions,
      coordinatesDict
    )
    setActiveTetrimino({ ...tetrimino, coordinates: newCoordinates })
  }, [tetrimino])

  const moveLeft = useCallback(() => {
    move(tetrimino, dimensions, coordinatesDict, setActiveTetrimino)([0, -1])
  }, [tetrimino, dimensions, coordinatesDict])
  const moveRight = useCallback(() => {
    move(tetrimino, dimensions, coordinatesDict, setActiveTetrimino)([0, 1])
  }, [tetrimino, dimensions, coordinatesDict])
  const moveDown = useCallback(
    (cb: Function) => {
      move(
        tetrimino,
        dimensions,
        coordinatesDict,
        setActiveTetrimino
      )([1, 0], cb)
    },
    [tetrimino, dimensions, coordinatesDict]
  )

  return {
    rotateClockwise,
    rotateCounterClockwise,
    moveLeft,
    moveRight,
    moveDown,
  }
}
