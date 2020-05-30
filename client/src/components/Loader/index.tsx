import React from 'react';
import Loader from 'react-loader-spinner';

interface IProps {
    type: 
        "Grid" |
        "Audio" | 
        "BallTriangle" | 
        "Bars" | 
        "Circles" | 
        "Hearts" | 
        "Oval" | 
        "Puff" | 
        "Rings" | 
        "TailSpin" | 
        "ThreeDots" | 
        "Watch" | 
        "RevolvingDot" |
        "Triangle" |
        "Plane" |
        "MutatingDots" |
        "None" | 
        "NotSpecified" |
        undefined;
    width: number;
    color: string;
}

const LoaderComponent = ({ type, width, color}: IProps) => {
    return (
        <Loader
            type={type}
            width={width}
            color={color}
        />
    )
}

LoaderComponent.defaultProps = {
    type: 'Grid',
    width: 35,
    color: '#0f9960'
}

export default LoaderComponent;