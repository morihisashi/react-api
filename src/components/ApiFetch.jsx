import React, { useEffect, useState } from 'react';
import './ApiFetch.css';

const ApiFetch = () => {
    const [getApi, setGetApi] = useState([]);
    const [maxTemperature, setMaxTemperature] = useState([]);
    const [minTemperature, setMinTemperature] = useState([]);
    const [times, setTimes] = useState([]);
    const [precipitation, setPrecipitation] = useState([]);

    useEffect(() => {
        setMaxTemperature(getApi['temperature_2m_max']);
        setMinTemperature(getApi['temperature_2m_min']);
        setTimes(getApi['time']);
        setPrecipitation(getApi['precipitation_probability_max']);
    }, [getApi]);

    const temInfo = async () => {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max&timezone=Asia%2FTokyo'
            // 'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min'
        );
        const data = await res.json();
        setGetApi(data['daily']);
    }

    return (
        <div>
            <h1>天気情報</h1>
            <button onClick={() => temInfo()}>東京の情報を見る</button>
            <table className='weather'>
                <thead>
                    {(times) && (
                        <tr>
                            日にち
                            {Object.values(times).map((data, id) => <th key={id}>{data}</th>)}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {(maxTemperature) && (
                        <tr>
                            最高気温
                            {Object.values(maxTemperature).map((data, id) => <th key={id}>{data}度</th>)}
                        </tr>
                    )}
                    {(minTemperature) && (
                        <tr>
                            最低気温
                            {Object.values(minTemperature).map((data, id) => <th key={id}>{data}度</th>)}
                        </tr>
                    )}
                    {(precipitation) && (
                        <tr>
                            降水確率
                            {Object.values(precipitation).map((data, id) => <th key={id}>{data}%</th>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ApiFetch
