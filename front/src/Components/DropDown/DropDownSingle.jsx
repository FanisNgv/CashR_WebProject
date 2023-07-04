import React, { useState, useEffect } from "react";
import Select from "react-select";
const SingleSelect = ({typesOfComes, selectedType ,setSelectedType}) => {

    const options = typesOfComes.map((typeOfCome) => ({
        label: typeOfCome,
        value: typeOfCome,
    }));

    const handleSelectedType = (selectedOptions) => {
        setSelectedType(selectedOptions);
    };

    return (
        <Select
            value={selectedType}
            onChange={handleSelectedType}
            options={options}
        />
    );
};

export default SingleSelect;
