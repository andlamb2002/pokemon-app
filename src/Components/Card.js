import PropTypes from 'prop-types';

function Card(props) {
    const handleClick = () => {
        props.onClick(props.id); // Pass the ID to the onClick handler
    };

    return (
        <div onClick={handleClick}>
            <img src={props.sprite} alt={props.name} />
            <h2>{props.name}</h2>
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
