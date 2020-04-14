import { Coordinate, Dimensions } from "../types"
import { useState, useCallback, useEffect } from "react"

export interface ITetrimino {
  coordinates: Coordinate[]
  color: string
}

const i: ITetrimino = {
  coordinates: [
    [0, -1],
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  color: "#00F0F0",
}
const j: ITetrimino = {
  coordinates: [
    [1, -1],
    [0, -1],
    [0, 0],
    [0, 1],
  ],
  color: "#0000F0",
}

const l: ITetrimino = {
  coordinates: [
    [0, -1],
    [0, 0],
    [0, 1],
    [1, 1],
  ],
  color: "#F0A000",
}
const o: ITetrimino = {
  coordinates: [
    [0, 0],
    [0, 1],
    [-1, 0],
    [-1, 1],
  ],
  color: "#F0F000",
}

const s: ITetrimino = {
  coordinates: [
    [0, -1],
    [0, 0],
    [1, 0],
    [1, 1],
  ],
  color: "#00F000",
}

const z: ITetrimino = {
  coordinates: [
    [1, -1],
    [1, 0],
    [0, 0],
    [0, 1],
  ],
  color: "#F00000",
}

const t: ITetrimino = {
  coordinates: [
    [0, -1],
    [0, 0],
    [1, 0],
    [-1, 0],
  ],
  color: "#A000F0",
}

const getRandomTetriminos = () => {
  const tetriminos = [t, z, s, l, j, i, o]
  return JSON.parse(
    JSON.stringify(tetriminos[Math.floor(Math.random() * tetriminos.length)])
  ) as ITetrimino
}

export const useTetriminos = (dimensions: Dimensions) => {
  const [activeTetrimino, setActiveTetrimino] = useState(getRandomTetriminos())
  const [nextTetrimino, setNextTetrimino] = useState(getRandomTetriminos())
  // const [brickPosition, setBrickPosition] = useState<[number, number]>([0, 0])
  useEffect(() => {
    setActiveTetrimino({
      color: activeTetrimino.color,
      coordinates: activeTetrimino.coordinates.map(coordinate => [
        1 + coordinate[0],
        3 + coordinate[1],
      ]),
    })
  }, [])
  // const [positionedTetrimino, setPositionedTetrimino] = useState<ITetrimino>({
  //   color: activeTetrimino.color,
  //   coordinates: activeTetrimino.coordinates.map(coordinate => [
  //     brickPosition[0] + coordinate[0],
  //     brickPosition[1] + coordinate[1],
  //   ]),
  // })

  // const

  // useEffect(() => {
  //   setBrickPosition({
  //     color: activeTetrimino.color,
  //     coordinates: activeTetrimino.coordinates.map(coordinate => [
  //       brickPosition[0] + coordinate[0],
  //       brickPosition[1] + coordinate[1],
  //     ]),
  //   })
  // }, [activeTetrimino, brickPosition])
  const replaceCurrentTetrimino = useCallback(() => {
    setActiveTetrimino(nextTetrimino)
    setNextTetrimino(getRandomTetriminos())
  }, [nextTetrimino])

  return {
    replaceCurrentTetrimino,
    setActiveTetrimino,
    activeTetrimino,
    nextTetrimino,
  }
}
