import {Coordinate } from '../types';

export function shiftCoordinates(coordinates: Coordinate[], shift: Coordinate){
    return coordinates.map((coordinate) => {
        return [coordinate[0] + shift[0], coordinate[1] + shift[1]];
      });
}
