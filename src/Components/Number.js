// Number.js
import React, { useState } from "react";

function Number(props) {
    const [numberInput, setNumberInput] = useState(0);

    const handleInput = (e) => {
        setNumberInput(e.target.value);
        props.onNumberChange(e.target.value); // Trigger the callback function
    };

    return (
        <div>
            <input 
                className="text-textColor text-4xl bg-white border-4 border-black rounded p-2" 
                type="number" 
                min="0"
                placeholder="Number"
                value={numberInput}
                onChange={handleInput}
            />
        </div>
    );
}

export default Number;
