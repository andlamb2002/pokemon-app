import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import Button from './Button';
import Number from './Number';

function Sidebar(props) {

    const [formKey, setFormKey] = useState(10);
    const [selectedOption, setSelectedOption] = useState(null);
    const [minNumber, setMinNumber] = useState("");
    const [maxNumber, setMaxNumber] = useState("");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        console.log("Selected option:", option);
    };
  
    const handleMinNumberChange = (value) => {
        setMinNumber(value);
    };

    const handleMaxNumberChange = (value) => {
        setMaxNumber(value);
    };
  
    const handleEnterClicked = () => {
        console.log("Dropdown value:", selectedOption);
        console.log("Min Number:", minNumber);
        console.log("Max Number:", maxNumber);
    };
  
    const handleReset = () => {
      setFormKey(formKey + 1);
      setSelectedOption(null);
      setMinNumber(0);
      setMaxNumber(0);
    };

    const optionsArray = ["Type1", "Type2", "Type3", "Type4"];
    let filter = <></>;

    if(!props.blank) {
        filter = <>
            {/* eslint-disable-next-line no-script-url */}
            <form key={formKey} action="javascript:void(0)" method="post">
                <Dropdown key={formKey} options={optionsArray} onSelect={handleOptionSelect} />
                <div className="flex flex-row">
                    <p className="text-4xl">❤️</p>
                    <Number name="Min" onNumberChange={handleMinNumberChange} />
                    <Number name="Max" onNumberChange={handleMaxNumberChange} />
                </div>
                
                <Button name="Enter" onClick={handleEnterClicked} />
                <Button name="Reset" color="red" onClick={handleReset} />
            </form>
        </>;
    }

  return (
    <div className="w-72 bg-primary">
        <h1>Filter❤️⚔️🛡️💨</h1>
        {filter}
    </div>
  );
}

Sidebar.propTypes = {
    blank: PropTypes.bool,
}

Sidebar.defaultProps = {
    blank: true,
}

export default Sidebar;