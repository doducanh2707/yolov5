import React from "react";
import { useEffect } from 'react';
const Camera = () => {
      useEffect(() => {
      const script = document.createElement('script');
      script.src = process.env.PUBLIC_URL + '/script.js'; // Path to your local script file
      script.async = true;
      const dbscript = document.createElement('script');
      dbscript.src = process.env.PUBLIC_URL + '/dbscript.js'; // Path to your local script file
      dbscript.async = true;

      
      document.body.appendChild(dbscript);
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
        document.body.removeChild(dbscript);
      };
    }, []);
    return(
        <div>
        <button id="record">
          <span></span>
        </button>
        <button id="capture">
          <span></span>
        </button>
        <button id="gallery">
          <span className="material-icons">collections</span>
        </button>

        <div className="filters">
          <div className="filter" style={{ backgroundColor: '#fab0a055' }}></div>
          <div className="filter" style={{ backgroundColor: '#a29bfe4b' }}></div>
          <div className="filter"></div>
        </div>

        <div className="zoom">
          <div className="in">
            <span className="material-icons">zoom_in</span>
          </div>
          <div className="out">
            <span className="material-icons">zoom_out</span>
          </div>
        </div>
    </div>
    ) 
}

export default Camera;

