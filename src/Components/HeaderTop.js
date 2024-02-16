import logo from '../Assets/logo.png';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';
import Button from './Button';
import Dropdown from './Dropdown';

function HeaderTop(props) {

    const [searchInput, setSearchInput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        console.log("Selected option:", selectedOption);
    }, [selectedOption]);

    const search = () => {
        if(props.searchInput) {
            const handleSearch = () => {
                console.log("Search input:", searchInput);

              };
            
              const handleOptionSelect = (option) => {
                  setSelectedOption(option);
              };

            const optionsArray = ["ID (Asc)", "ID (Desc)", "Name (Asc)", "Name (Desc)"]

            return <>
                <Search setSearchInput={setSearchInput}></Search>
                <Button name="🔍" onClick={handleSearch}></Button>
                <Dropdown options={optionsArray} onSelect={handleOptionSelect}></Dropdown>
            </>
        }
        else {
            return <div></div>
        }
    }

    return (
        <div className="flex flex-row justify-between bg-header items-center">
            <Link to="/"> 
                <img src={logo} alt="logo" className="w-72"></img>
            </Link>
            {search()}
            <div className="w-72"></div>
        </div>
        
    );
}

HeaderTop.propTypes = {
    searchInput: PropTypes.bool,
    sortDropdown: PropTypes.bool,
    name: PropTypes.string,
}

HeaderTop.defaultProps = {
    searchInput: false,
    sortDropdown: false,
    name: "",
}

export default HeaderTop;