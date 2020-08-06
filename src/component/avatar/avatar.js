import React from 'react';
import './avatar.css';

const styleGenerator = ({size, image}) => ({
    minWidth: size, 
    maxWidth: size, 
    minHeight: size, 
    maxHeight: size, 
    backgroundImage: `url(${image})`,
});

const Avatar = props => <div className="avatar" style={styleGenerator(props)} {...props} />;
Avatar.defaultProps = {
    size : "64px",
};
export default Avatar;