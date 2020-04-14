export type Height = number
export type Width = number
export type PosY = number
export type PosX = number
export type Color = string

export type Coordinate = [PosY, PosX]
export type Dimensions = [Height, Width]

export type CoordinateDictionary = { [PosYPosX: string]: Color }
export type CoordinateIndex = { [PosY: string]: { [PosX: string]: true } }
