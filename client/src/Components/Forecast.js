import React, {useState, useEffect} from 'react';
import ForecastItem from './ForecastItem';
import {convertDate} from '../utils';


const Forecast = (props) => {
    const [data, setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    }, [props]);

    const {timezone, time} = props;
    
    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ]
    // Convert UNIX time to regular time
    const date = convertDate(timezone, time)
    const currentDay = date.getUTCDay();


    // The provided forecast data has weather data for every 3 hours
    // Get the data for 5 days
    let daysData = [];
    for (let i = 0; i < 40; i += 8) {
        daysData.push(data.slice(i, i+8));
    };

    // Create forecast component item for each day
    const forecastComponents = daysData.map((item,index)=> {

        // Get maximum and minimum temperatures
        const temps = item.map(item => item.main.temp);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);

        // Get day
        let utcDay = (currentDay + (index + 1)) % 7;

        // Icons for that day's weather
        const icons = item.map(item => item.weather[0].icon);

        // Get each icon's frequency. The most frequent icon is
        // selected to represent that day's forecasted weather
        const iconFrequency = {};
        icons.forEach(icon => {
            if (!Object.keys(iconFrequency).includes(icon)) {
                iconFrequency[icon] = 1;
            } else {
                iconFrequency[icon]++;
            };
        });
        const icon = Object.keys(iconFrequency).reduce((acc, currentVal) => (
                iconFrequency[acc] > iconFrequency[currentVal]? acc : currentVal
            ));
        return (
            <ForecastItem
                key={index} 
                maxTemp={Math.round(maxTemp)}
                minTemp={Math.round(minTemp)}
                day={days[utcDay]}
                icon={icon}
            />
        )
    });

    return (
        <div className='forecast-container'>
            <hr />
            {forecastComponents}
        </div>
    )
}

export default Forecast;