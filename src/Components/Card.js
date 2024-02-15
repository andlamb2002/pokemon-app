import PropTypes from 'prop-types';

function Card(props) {
    const handleClick = () => {
        props.onClick(props.id); // Pass the ID to the onClick handler
    };

    return (
        <div className="w-64 h-64 bg-lightRed text-textColor text-4xl flex flex-col justify-center items-center p-4 hover:bg-accentRed" onClick={handleClick}>
            <img className="w-32 h-32 mb-4" src={props.sprite} alt={props.name} />
            <h2>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h2>
            
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    sprite: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

Card.defaultProps = {
    name: "Name",
    id: 0,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
}

export default Card;
