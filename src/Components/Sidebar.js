import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import Button from './Button';
import Number from './Number';

function Sidebar(props) {

    const [formKey, setFormKey] = useState(10);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const [minNumberHp, setMinNumberHp] = useState("");
    const [maxNumberHp, setMaxNumberHp] = useState("");

    const [minNumberAtk, setMinNumberAtk] = useState("");
    const [maxNumberAtk, setMaxNumberAtk] = useState("");

    const [minNumberDef, setMinNumberDef] = useState("");
    const [maxNumberDef, setMaxNumberDef] = useState("");

    const [minNumberSpd, setMinNumberSpd] = useState("");
    const [maxNumberSpd, setMaxNumberSpd] = useState("");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
  
    const handleMinNumberChange = (value, stateSetter) => {
        stateSetter(value);
    };
  
    const handleEnterClicked = () => {
        const logs = [
            selectedOption,
            minNumberHp,
            maxNumberHp,
            minNumberAtk,
            maxNumberAtk,
            minNumberDef,
            maxNumberDef,
            minNumberSpd,
            maxNumberSpd
        ];
        props.onLogs(logs);
    };
  
    const handleReset = () => {
      setFormKey(formKey + 1);
      setSelectedOption(null);

      setMinNumberHp("");
      setMaxNumberHp("");
      setMinNumberAtk("");
      setMaxNumberAtk("");
      setMinNumberDef("");
      setMaxNumberDef("");
      setMinNumberSpd("");
      setMaxNumberSpd("");
    };

    const optionsArray = [
        "Type",
        "Bug",
        "Dark",
        "Dragon",
        "Electric",
        "Fairy",
        "Fighting",
        "Fire",
        "Flying",
        "Ghost",
        "Grass",
        "Ground",
        "Ice",
        "Normal",
        "Poison",
        "Psychic",
        "Rock",
        "Steel",
        "Water"
      ];

    let filter = <></>;

    if(!props.blank) {
        filter = 
        <div >
            {/* eslint-disable-next-line no-script-url */}
            <form key={formKey} action="javascript:void(0)" method="post" className="grid grid-cols-1 gap-4">
                <p className="text-textColor text-4xl">Filter</p>

                <Dropdown key={formKey} options={optionsArray} onSelect={handleOptionSelect} />

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">❤️</p>
                    <Number name="Min" onNumberChange={(value) => handleMinNumberChange(value, setMinNumberHp)} />
                    <Number name="Max" onNumberChange={(value) => handleMinNumberChange(value, setMaxNumberHp)} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">⚔️</p>
                    <Number name="Min" onNumberChange={(value) => handleMinNumberChange(value, setMinNumberAtk)} />
                    <Number name="Max" onNumberChange={(value) => handleMinNumberChange(value, setMaxNumberAtk)} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">🛡️</p>
                    <Number name="Min" onNumberChange={(value) => handleMinNumberChange(value, setMinNumberDef)} />
                    <Number name="Max" onNumberChange={(value) => handleMinNumberChange(value, setMaxNumberDef)} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">💨</p>
                    <Number name="Min" onNumberChange={(value) => handleMinNumberChange(value, setMinNumberSpd)} />
                    <Number name="Max" onNumberChange={(value) => handleMinNumberChange(value, setMaxNumberSpd)} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <Button name="Enter" onClick={handleEnterClicked} />
                    <Button name="Reset" color="red" onClick={handleReset}/>
                </div>
                
            </form>
        </div>;
    }

    return (
        <div className="w-72 min-w-72 max-w-72 bg-primary">
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
