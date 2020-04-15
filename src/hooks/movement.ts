import { useCallback, useEffect } from "react"
import { ITetrimino } from "./tetriminos"
import { Dimensions, CoordinateDictionary, Coordinate } from "../types"

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

  const shift = useCallback(
    (shift: Coordinate, cb?: Function) => {
      const positionedTetrimino = positionTetrimino(tetrimino, brickPosition)
      console.log(positionedTetrimino.coordinates)

      if (
        willCollide(shiftCoordinates(positionedTetrimino.coordinates, shift))
      ) {
        setBrickPosition(shiftCoordinate(brickPosition, shift))
      } else {
        if (cb) cb()
      }
    },
    [tetrimino, dimensions, coordinatesDict, brickPosition]
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

  const moveDown = useCallback(
    (cb?: Function) => {
      return shift([1, 0], cb)
    },
    [shift]
  )

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

  return {
    rotateClockwise,
    rotateCounterClockwise,
    moveLeft,
    moveRight,
    moveDown,
  }
}
