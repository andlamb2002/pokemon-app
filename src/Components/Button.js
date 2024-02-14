import PropTypes from 'prop-types';

function Button(props) {

    let buttonClass = "text-textColor text-4xl bg-secondary border-4 border-accent rounded p-2 hover:bg-accent";

    if(props.color === "red") {
        buttonClass = "text-textColor text-4xl bg-lightRed border-4 border-accentRed rounded p-2 hover:bg-accentRed";
    }

    return (
        <div>
            <button className={buttonClass} onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

Button.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

Button.defaultProps = {
    name: "Button",
    color: "secondary",
    onClick: () => { },
}

export default Button;