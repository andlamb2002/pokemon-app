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
        if (typeof props.onDropdownInputChange === 'function') {
          props.onDropdownInputChange(selectedOption);
        }
      }, [props, selectedOption]);

    const content = () => {
        if (props.searchInput) {
            const optionsArray = ["ID (Asc)", "ID (Desc)", "Name (Asc)", "Name (Desc)"];
            return (
                <>
                    <div className="flex flex-row justify-between bg-header items-center">
                        <Link to="/"> 
                            <img src={logo} alt="logo" className="w-72"></img>
                        </Link>
                        <Search setSearchInput={setSearchInput}></Search>
                        <Button name="🔍" onClick={handleSearch}></Button>
                        <Dropdown options={optionsArray} onSelect={handleOptionSelect}></Dropdown>
                        <div className="w-72"></div>
                    </div>
                </>
            );
        } else {
            return <>
                <div className="flex flex-row bg-header items-center p">
                    <Link to="/"> 
                        <img src={logo} alt="logo" className="w-72"></img>
                    </Link>
                    <div className="className=text-textColor bg-primary text-5xl m-4 p-4 rounded">
                        {props.name}
                    </div>
                </div>
            </>
        }
    };

    return (
        <>
            {content()}
        </>
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
