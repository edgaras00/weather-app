import React, {useState} from 'react';

const UnitContext = React.createContext();

function UnitContextProvider({children}) {

    const [isFahrenheit, setIsFahrenheit] = useState(true);

    const getCelsius = () => {
        setIsFahrenheit(false);
    }

    const getFahrenheit = () => {
        setIsFahrenheit(true);
    }

    return (
        <UnitContext.Provider value={{isFahrenheit, getCelsius, getFahrenheit}}>
            {children}
        </UnitContext.Provider>
    );
};

export {UnitContextProvider, UnitContext};