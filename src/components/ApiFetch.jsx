import React, { useEffect, useState } from 'react'

const ApiFetch = () => {
    const [getApi, setGetApi] = useState([]);
    const [maxTemperature, setMaxTemperature] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo'
            );
            const data = await res.json();
            setGetApi(data['daily']);
            // console.log(data['daily']);
        })();
        setMaxTemperature(getApi['temperature_2m_max']);
    }, []);
    
    // console.log(getApi['temperature_2m_max']);

    return (
        <div>
            <ul>
                {/* {maxTemperature.map((data, id) => <li key={id}>{data}</li>)} */}
                {maxTemperature}
            </ul>
        </div>
    )
}

export default ApiFetch
