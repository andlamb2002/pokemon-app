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
        console.log("Selected option:", option);
    };
  
    const handleMinNumberChangeHp = (value) => {
        setMinNumberHp(value);
    };
    const handleMaxNumberChangeHp = (value) => {
        setMaxNumberHp(value);
    };

    const handleMinNumberChangeAtk = (value) => {
        setMinNumberAtk(value);
    };
    const handleMaxNumberChangeAtk = (value) => {
        setMaxNumberAtk(value);
    };

    const handleMinNumberChangeDef = (value) => {
        setMinNumberDef(value);
    };
    const handleMaxNumberChangeDef = (value) => {
        setMaxNumberDef(value);
    };

    const handleMinNumberChangeSpd = (value) => {
        setMinNumberSpd(value);
    };
    const handleMaxNumberChangeSpd = (value) => {
        setMaxNumberSpd(value);
    };
  
    const handleEnterClicked = () => {
        console.log("Dropdown value:", selectedOption);

        console.log("Min Number:", minNumberHp);
        console.log("Max Number:", maxNumberHp);
        console.log("Min Number:", minNumberAtk);
        console.log("Max Number:", maxNumberAtk);
        console.log("Min Number:", minNumberDef);
        console.log("Max Number:", maxNumberDef);
        console.log("Min Number:", minNumberSpd);
        console.log("Max Number:", maxNumberSpd);
    };
  
    const handleReset = () => {
      setFormKey(formKey + 1);
      setSelectedOption(null);

      setMinNumberHp(0);
      setMaxNumberHp(0);
      setMinNumberAtk(0);
      setMaxNumberAtk(0);
      setMinNumberDef(0);
      setMaxNumberDef(0);
      setMinNumberSpd(0);
      setMaxNumberSpd(0);
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
                    <Number name="Min" onNumberChange={handleMinNumberChangeHp} />
                    <Number name="Max" onNumberChange={handleMaxNumberChangeHp} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">⚔️</p>
                    <Number name="Min" onNumberChange={handleMinNumberChangeAtk} />
                    <Number name="Max" onNumberChange={handleMaxNumberChangeAtk} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">🛡️</p>
                    <Number name="Min" onNumberChange={handleMinNumberChangeDef} />
                    <Number name="Max" onNumberChange={handleMaxNumberChangeDef} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <p className="text-4xl">💨</p>
                    <Number name="Min" onNumberChange={handleMinNumberChangeSpd} />
                    <Number name="Max" onNumberChange={handleMaxNumberChangeSpd} />
                </div>

                <div className="flex flex-row justify-evenly">
                    <Button name="Enter" onClick={handleEnterClicked} />
                    <Button name="Reset" color="red" onClick={handleReset}/>
                </div>
                
            </form>
        </div>;
    }

  return (
    <div className="w-72 bg-primary">
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