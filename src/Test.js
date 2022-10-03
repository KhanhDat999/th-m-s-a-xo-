import React from 'react';
import { useNavigate } from "react-router-dom";

function Test(){

const dat = useNavigate();
console.log(dat)



    return (
       <div className="App">
          <button >Next page </button>
       </div>
    );
};

export default Test;