import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import "./App.css";

const pointSize = 1;
const canvasWidth = 300;
const canvasHeight = 300;

const amountOfPointsToDraw = 50000;

type Point = {
  x: number;
  y: number;
};

const initialPoints: Point[] = [
  { x: canvasWidth / 2, y: 0 },
  { x: canvasWidth - pointSize, y: canvasHeight - pointSize },
  { x: 0, y: canvasHeight - pointSize },
];

const points: Point[] = [...initialPoints];

const getRandomInitialPoint = () =>
  initialPoints[Math.round(Math.random() * 10) % initialPoints.length];

for (let i = 0; i < amountOfPointsToDraw; i++) {
  const randomPoint = getRandomInitialPoint();
  const currentPoint = points[points.length - 1];

  const middlePoint: Point = {
    x: (randomPoint.x + currentPoint.x) / 2,
    y: (randomPoint.y + currentPoint.y) / 2,
  };

  points.push(middlePoint);
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawPoint = (point: Point) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        context.fillStyle = "#000000";
        context.fillRect(point.x, point.y, pointSize, pointSize);
      }
    }
  };

  const drawPoints = (amount: number) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        context.fillStyle = "#000000";
        const pointsToDraw = points.slice(0, amount);

        for (const point of pointsToDraw) {
          drawPoint(point);
        }
      }
    }
  };

  const drawInitialPoints = useCallback(() => {
    initialPoints.forEach(drawPoint);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      drawInitialPoints();
    }
  }, [drawInitialPoints]);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const pointsToDraw = event.currentTarget.valueAsNumber;

    drawPoints(pointsToDraw);
  };

  return (
    <div className="container">
      <h1 className="title">Sierpiński triangle</h1>

      <div className="input-container">
        <p>Points amount</p>
        <input
          type="range"
          min="0"
          max="25000"
          step="100"
          onChange={handleRangeChange}
        />
      </div>

      <div
        className="canvas-container"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <canvas ref={canvasRef} />
      </div>

      <a
        href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle"
        className="more-info"
        target="_blank"
      >
        More info
      </a>
    </div>
  );
}

export default App;
