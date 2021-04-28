import React, { useMemo } from 'react';
import './Area.css';

const createMap = (size) => {
  const map = [];
  for(let i=0; i<size; i++){
    map.push([]);
    for(let k=0; k<size; k++){
      map[i].push(false);
    }
  }
  return map;
};

const Area = ({ size=0, handleHover }) => {
  const map = useMemo(()=>createMap(size), [size]);

  const handleToggle = (row, col)=>{
    if(handleHover) handleHover(row, col);
    map[row][col] = !map[row][col];
  }
  return (
    <div className="area">
      {map.map((row, rowI)=>(
        <div 
          className="area__row" 
          key={`area-row-${rowI}`}
        >
          {row.map((cell, cellI)=>( 
            <div 
              key={`area-row-${rowI}-cell-${cellI}`} 
              className={`area__cell ${cell ? "active" : ""}`}
              onMouseEnter={()=>handleToggle(rowI, cellI)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Area;