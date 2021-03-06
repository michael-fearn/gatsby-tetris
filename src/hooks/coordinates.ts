import { useState, useEffect, useCallback } from "react"
import { ITetrimino } from "./tetriminos"
import {
  Dimensions,
  CoordinateDictionary,
  CoordinateIndex,
  Coordinate,
} from "../types"
import { positionTetrimino, tetriminoToCoords } from "./tetris"

export const useCoordinates = (
  activeTetrimino: ITetrimino,
  brickPosition: Coordinate,
  dimensions: Dimensions
  // tetriminoPosition: Coordinate
) => {
  const [stationaryBrickCoordinates, setStationaryBrickCoordinates] = useState<
    CoordinateDictionary
  >({})
  const [
    stationaryBrickCoordinateIndex,
    setStationaryBrickCoordinateIndex,
  ] = useState<CoordinateIndex>({})

  const [allCoordinates, setAllCoordinates] = useState<CoordinateDictionary>({})

  const reset = useCallback(() => {
    setStationaryBrickCoordinates({})
    setStationaryBrickCoordinateIndex({})
  }, [])

  useEffect(() => {
    const tetrimino = positionTetrimino(activeTetrimino, brickPosition)

    setAllCoordinates({
      ...stationaryBrickCoordinates,
      ...tetriminoToCoords(tetrimino),
    })
  }, [activeTetrimino, stationaryBrickCoordinates, brickPosition])

  const addStationaryCoordinates = useCallback(
    (cb: Function) => {
      const tetrimino = positionTetrimino(activeTetrimino, brickPosition)
      const boardWidth = dimensions[1]

      const newCoordinateDict = {
        ...stationaryBrickCoordinates,
        ...tetriminoToCoords(tetrimino),
      }
      const newCoordinateIndex = { ...stationaryBrickCoordinateIndex }

      tetrimino.coordinates.forEach(([posY, posX]) => {
        if (!newCoordinateIndex[posY]) {
          newCoordinateIndex[posY] = {}
        }
        newCoordinateIndex[posY][posX] = true
      })

      const affectedRows = tetrimino.coordinates
        .map(coordinate => coordinate[0])
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })

      const rowsToRemove = affectedRows.filter(
        row => Object.keys(newCoordinateIndex[row]).length >= boardWidth
      )
      // delete coordinates and indexes
      rowsToRemove.forEach(posY => {
        Object.keys(newCoordinateIndex[posY]).forEach(posX => {
          delete newCoordinateDict[String([posY, Number(posX)])]
        })
        delete newCoordinateIndex[posY]

        for (let row = posY - 1; row >= 0; --row) {
          // update Dictionary
          Object.entries(newCoordinateIndex[row] || {}).forEach(([column]) => {
            newCoordinateDict[String([row + 1, column])] =
              newCoordinateDict[String([row, column])]
            delete newCoordinateDict[String([row, column])]
          })
          // shift indexes
          newCoordinateIndex[Number(row) + 1] = newCoordinateIndex[row]
          delete newCoordinateIndex[row]
        }
      })

      setStationaryBrickCoordinates(newCoordinateDict)
      setStationaryBrickCoordinateIndex(newCoordinateIndex)

      cb()
      return rowsToRemove.length
    },
    [
      stationaryBrickCoordinates,
      stationaryBrickCoordinateIndex,
      activeTetrimino,
      brickPosition,
    ]
  )

  return {
    reset,
    allCoordinates,
    addStationaryCoordinates,
    stationaryBrickCoordinates,
  }
}
