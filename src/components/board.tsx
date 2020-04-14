import React from "react"

const Point: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <td
      style={{
        height: "20px",
        width: "20px",
        border: "1px solid black",
        backgroundColor: color,
      }}
    ></td>
  )
}

export const Board: React.FC<{
  dimensions: [number, number]
  points: { [posYPosX: string]: string }
}> = props => (
  <table>
    <tbody>
      {new Array(props.dimensions[0]).fill(undefined).map((_, height) => (
        <tr key={`board-row-${height}`}>
          {new Array(props.dimensions[1]).fill(undefined).map((__, width) => (
            <Point
              key={`board-row-${height}-pos-${width}`}
              color={props.points[String([height, width])]}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
