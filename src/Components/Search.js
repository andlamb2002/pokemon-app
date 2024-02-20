import React, { useState } from "react";

function Search(props) {
    const [search, setSearch] = useState("");

    const handleInput = (e) => {
        setSearch(e.target.value);
        props.setSearchInput(e.target.value); 
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.onEnterPress(search);
        }
    };

    return (
        <div>
            <input
                className="text-textColor text-4xl bg-white border-4 border-black rounded p-2"
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
}

export default Search;
