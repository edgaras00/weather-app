import React, {useContext} from 'react';
import {UnitContext} from '../Context/UnitContext';
import {fahrenheitToCelsius} from '../utils';

function ForecastItem(props) {
    
    const {minTemp, maxTemp, icon, day} = props
    const {isFahrenheit} = useContext(UnitContext);

    const weatherIcon = `http://openweathermap.org/img/wn/${icon.replace('n', 'd')}@2x.png`
    return (
        <div className='forecast-item'>
            <span className='forecast-day'>{day}</span>
            <img src={weatherIcon} alt='icon' width='30px' height='30px' />
            <div className='forecast-min-max'>
                <span>{isFahrenheit? minTemp : fahrenheitToCelsius(minTemp)}</span>
                <span>{isFahrenheit? maxTemp : fahrenheitToCelsius(maxTemp)}</span>
            </div>
        </div>
    )
}

export default ForecastItem;