import React, { useEffect, useState } from 'react';
import './ApiFetch.css';

const ApiFetch = () => {
    const [getApi, setGetApi] = useState([]);
    const [maxTemperature, setMaxTemperature] = useState([]);
    const [minTemperature, setMinTemperature] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        setMaxTemperature(getApi['temperature_2m_max']);
        setMinTemperature(getApi['temperature_2m_min']);
        setTimes(getApi['time']);
    }, [getApi]);

    const temInfo = async () => {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo'
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
                    <tr>
                        日にち
                        {(times) && (Object.values(times).map((data, id) => <th key={id}>{data}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        最高気温
                        {(maxTemperature) && (Object.values(maxTemperature).map((data, id) => <th key={id}>{data}度</th>))}
                    </tr>
                    <tr>
                        最低気温
                        {(minTemperature) && (Object.values(minTemperature).map((data, id) => <th key={id}>{data}度</th>))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ApiFetch
