import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import Button from './Button';
import Dropdown from './Dropdown';
import logo from '../Assets/logo.png';

function HeaderTop(props) {
    const [searchInput, setSearchInput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleSearch = () => {
        props.onSearchInputChange(searchInput); 
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        console.log(typeof props.onDropdownInputChange); 
        if (typeof props.onDropdownInputChange === 'function') {
          props.onDropdownInputChange(selectedOption);
        }
      }, [props, selectedOption]);

    const search = () => {
        if (props.searchInput) {
            const optionsArray = ["ID (Asc)", "ID (Desc)", "Name (Asc)", "Name (Desc)"];
            return (
                <>
                    <Search setSearchInput={setSearchInput}></Search>
                    <Button name="🔍" onClick={handleSearch}></Button>
                    <Dropdown options={optionsArray} onSelect={handleOptionSelect}></Dropdown>
                </>
            );
        } else {
            return <div></div>;
        }
    };

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
    onSearchInputChange: PropTypes.func, 
    onDropdownInputChange: PropTypes.func,
};

HeaderTop.defaultProps = {
    searchInput: false,
    sortDropdown: false,
    name: "",
};

export default HeaderTop;
