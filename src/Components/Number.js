import React, { useState } from "react";
import PropTypes from 'prop-types';

function Number(props) {
    const [numberInput, setNumberInput] = useState("");

    const handleInput = (e) => {
        setNumberInput(e.target.value);
        props.onNumberChange(e.target.value); 
    };

    return (
        <div>
            <input 
                className="text-textColor text-2xl bg-white border-4 border-black rounded w-24 p-2" 
                type="number" 
                min="0"
                placeholder={props.name}
                value={numberInput}
                onChange={handleInput}
            />
        </div>
    );
}

Number.propTypes = {
    name: PropTypes.string,
    onNumberChange: PropTypes.func,
}

Number.defaultProps = {
    name: "Number",
    onNumberChange: () => { },
} 

export default Number;
