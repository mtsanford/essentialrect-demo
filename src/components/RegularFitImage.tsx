import React from 'react';
import './RegularFitImage.css'; 

const RegularFitImage: React.FC<{
    imageURL: string,
}> = ({ imageURL }) => {

    const styles = {
        backgroundImage: `url(${imageURL})`
    };

    return (
        <div className="RegularFitImageWrapper" style={styles} />
    )
}

export default RegularFitImage;
