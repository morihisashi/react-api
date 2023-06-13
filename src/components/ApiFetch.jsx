import React, { useEffect, useState } from 'react';
import './ApiFetch.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const ApiFetch = () => {
    // APIの情報を格納
    const [getApi, setGetApi] = useState([]);
    // 最高気温の情報を格納
    const [maxTemperature, setMaxTemperature] = useState([]);
    // 最低気温の情報を格納
    const [minTemperature, setMinTemperature] = useState([]);
    // 日にちの情報を格納
    const [times, setTimes] = useState([]);
    // 降水確率の情報を格納
    const [precipitation, setPrecipitation] = useState([]);

    // 各情報を格納
    useEffect(() => {
        setMaxTemperature(getApi['temperature_2m_max']);
        setMinTemperature(getApi['temperature_2m_min']);
        setTimes(getApi['time']);
        setPrecipitation(getApi['precipitation_probability_max']);
    }, [getApi]);

    const temInfo = async () => {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max&timezone=Asia%2FTokyo'
        );
        const data = await res.json();
        setGetApi(data['daily']);
    }

    return (
        <div className='api'>
            <h1>天気情報</h1>
            <button onClick={() => temInfo()}>東京の情報を見る</button>
            <table className='weather'>
                <thead>
                    {(times) && (
                        <tr>
                            <th>日にち</th>
                            {Object.values(times).map((data, id) => <td key={id}>{data}</td>)}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {(maxTemperature) && (
                        <tr>
                            <th>最高気温</th>
                            {Object.values(maxTemperature).map((data, id) => <td key={id} className='max'>{data}度</td>)}
                        </tr>
                    )}
                    {(minTemperature) && (
                        <tr>
                            <th>最低気温</th>
                            {Object.values(minTemperature).map((data, id) => <td key={id} className='min'>{data}度</td>)}
                        </tr>
                    )}
                    {(precipitation) && (
                        <tr>
                            <th>降水確率</th>
                            {Object.values(precipitation).map((data, id) => <td key={id}>{data}%</td>)}
                        </tr>
                    )}
                    {(precipitation) && (
                        <tr>
                            <th>天気</th>
                            {Object.values(precipitation).map((data, id) =>
                                <td key={id}>{(data <= 30) ? <WbSunnyIcon /> : (data <= 70) ? <CloudIcon /> : <BeachAccessIcon />}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ApiFetch
