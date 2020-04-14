import { useCallback } from "react"
import { ITetrimino } from "./tetriminos"
import { Dimensions, CoordinateDictionary, Coordinate } from "../types"

const shiftCoordinate = (
  coordinate: Coordinate,
  shift: Coordinate
): Coordinate => [coordinate[0] + shift[0], coordinate[1] + shift[1]]

const shiftCoordinates = (
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

export const useMovement = (
  tetrimino: ITetrimino,
  setActiveTetrimino: React.Dispatch<React.SetStateAction<ITetrimino>>,
  brickPosition: Coordinate,
  setBrickPosition: React.Dispatch<React.SetStateAction<[number, number]>>,
  dimensions: Dimensions,
  coordinatesDict: CoordinateDictionary
) => {
  const willCollide = useCallback(
    (coordinates: Coordinate[]) => {
      return coordinates.every(([posY, posX]) => {
        const isClearLeft = 0 <= posX
        const isClearRight = posX < dimensions[1]
        const isClearTop = 0 <= posY
        const isClearBottom = posY < dimensions[0]
        const isClearEnvironment = !coordinatesDict[String([posY, posX])]
        return (
          isClearLeft &&
          isClearRight &&
          isClearTop &&
          isClearBottom &&
          isClearEnvironment
        )
      })
    },
    [dimensions, coordinatesDict]
  )
  const moveBrick = useCallback(
    (shift: Coordinate) => {
      setBrickPosition(shiftCoordinate(brickPosition, shift))
    },
    [brickPosition]
  )

  const shift = useCallback(
    (shift: Coordinate) => {
      const positionedTetrimino = positionTetrimino(tetrimino, brickPosition)
      if (
        willCollide(shiftCoordinates(positionedTetrimino.coordinates, shift))
      ) {
        moveBrick(shift)
      }
    },
    [tetrimino, dimensions, coordinatesDict]
  )

  const rotate = useCallback(
    (remapFunc: (Coordinate) => Coordinate) => {
      const rotatedTetrimino: ITetrimino = {
        ...tetrimino,
        coordinates: tetrimino.coordinates.map(remapFunc),
      }
      const positionedTetrimino = positionTetrimino(
        rotatedTetrimino,
        brickPosition
      )

      if (!willCollide(positionedTetrimino.coordinates)) {
        if (
          willCollide(shiftCoordinates(positionedTetrimino.coordinates, [0, 1]))
        ) {
          shift([0, 1])
          setActiveTetrimino(rotatedTetrimino)
        }

        if (
          willCollide(
            shiftCoordinates(positionedTetrimino.coordinates, [0, -1])
          )
        ) {
          shift([0, -1])
          setActiveTetrimino(rotatedTetrimino)
        }
      } else setActiveTetrimino(rotatedTetrimino)
    },
    [tetrimino, brickPosition]
  )

  const rotateClockwise = useCallback(() => {
    rotate(([posY, posX]) => [posX, -posY])
  }, [rotate])

  const rotateCounterClockwise = useCallback(() => {
    rotate(([posY, posX]) => [-posX, posY])
  }, [rotate])

  const moveLeft = useCallback(() => {
    return shift([0, -1])
  }, [shift])

  const moveRight = useCallback(() => {
    return shift([0, 1])
  }, [shift])

  const moveDown = useCallback(() => {
    return shift([1, 0])
  }, [shift])

  return {
    rotateClockwise,
    rotateCounterClockwise,
    moveLeft,
    moveRight,
    moveDown,
  }
}
