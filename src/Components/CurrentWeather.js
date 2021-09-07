import React, {useState, useContext} from 'react';
import {UnitContext} from '../Context/UnitContext';
import {fahrenheitToCelsius, convertDate} from '../utils';

// Component that renders the current weather data
const CurrentWeather = (props) => {

    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ]

    // Convert UNIX time to selected location's current date and time
    const date = convertDate(props.time, props.dt);
    // Extract the current day from the Date object
    const currentDay = days[date.getUTCDay()];
    // const currentDay = getCurrentDay(props.time, props.dt)

    // Component states
    const [currentTemperature] = useState(Math.round(props.temperature))
    const [minTemperature] = useState(Math.round(props.tempMin));
    const [maxTemperature] = useState(Math.round(props.tempMax));
    // State from Context
    const {isFahrenheit, getCelsius, getFahrenheit} = useContext(UnitContext);

    const weatherIcon = `http://openweathermap.org/img/wn/${props.iconId}@2x.png`
    const capitalizedDescription = props.description.charAt(0)
                                        .toUpperCase() + props.description.slice(1);
    return(
        <div className='current-weather'>
            <div className='temperature'>
                <img src={weatherIcon} alt='icon'  width='100px' height='100px'/>
                <span className='temp'>
                    {
                        isFahrenheit? 
                        currentTemperature : 
                        fahrenheitToCelsius(currentTemperature)
                    } &deg;
                </span>
            </div>
            <span className='location'>{props.location}</span>
            <span>{capitalizedDescription}</span>
            <div className='additional-info'>
                <div className='additional-first'>
                    <span>{currentDay}</span>
                    <div className='min-max'>
                        <span>
                            {
                                isFahrenheit? 
                                maxTemperature : 
                                fahrenheitToCelsius(maxTemperature)
                            }
                        </span>
                        <span>
                            {
                                isFahrenheit? 
                                minTemperature : 
                                fahrenheitToCelsius(minTemperature)
                            }
                        </span>
                    </div>                    
                </div>
                <hr />
                <div className='additional-second'>
                    <div>
                        <span 
                            className='degree-units'
                            onClick={getCelsius} 
                            style={{ color: isFahrenheit ? null : 'red' }}
                        >
                            &deg; C
                        </span>
                        <span> / </span>
                        <span
                            className='degree-units' 
                            onClick={getFahrenheit} 
                            style={{ color: isFahrenheit ? 'red' : null }}
                        >
                            &deg; F
                        </span>
                    </div>
                    <div className='humidity-wind'>
                        <span>Humidity: {props.humidity}%</span>
                        <span>Wind: {props.wind} mph</span>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default CurrentWeather;