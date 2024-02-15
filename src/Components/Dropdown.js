import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Dropdown(props) {
    const [selectedOption, setSelectedOption] = useState(props.name);

    const handleSelect = (option) => {
        setSelectedOption(option);
        props.onSelect(option); 
    };

    return (
        <div>
            <select className="text-textColor text-2xl bg-white border-4 border-black rounded p-2" value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

Dropdown.propTypes = {
    options: PropTypes.array,
    onSelect: PropTypes.func,
}

Dropdown.defaultProps = {
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    onSelect: () => { },
}

export default Dropdown;