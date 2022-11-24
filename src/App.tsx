import React, { useState } from 'react'
import './App.css'

type TPoint = {
  clientX: number,
  clientY: number
}

function App() {
  const [points, setPoints] = useState<TPoint[]>([])
  const [redoPoints, setRedoPoints] = useState<TPoint[]>([])

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    setPoints([...points, {
      clientX: clientX,
      clientY: clientY,
    }])
  }

  function handleUndo() {
    const newPoints = [...points];
    const undoPoints = newPoints.pop();
    const storeUndoPoints: TPoint[] = [];

    setPoints(newPoints);

    if(!undoPoints) return;
    storeUndoPoints.push(undoPoints);
    setRedoPoints([...redoPoints, ...storeUndoPoints]);
  }

  function handleRedo() {
    const getUndoPoints = [...redoPoints];
    const toRedoPoints = getUndoPoints.pop();
    const storeRedoPoints:TPoint [] = [];

    setRedoPoints(getUndoPoints);

    if(!toRedoPoints) return;
    storeRedoPoints.push(toRedoPoints);
    setPoints([...points, toRedoPoints]);

  }

  function handleClear() {
    setPoints([]);
    setRedoPoints([]);
  }

  return (
    <>
    <div className="button-placement">
      <button onClick={handleUndo} disabled={!points.length}>undo</button>
      <button onClick={handleRedo} disabled={!redoPoints.length}>redo</button>
      <button onClick={handleClear} disabled={!points.length && !redoPoints.length}>clear</button>
    </div>

    <div className="App" onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClick(event)}>
      {
        points.map((point:TPoint, index:number) => {return <div key={index} className='createCircle' style={{left: point.clientX-7 + 'px', top: point.clientY-7 + 'px'}}></div>})
      }
    </div>
    </>
  )
}

export default App
