import React, { useEffect, useState } from 'react'

const ApiFetch = () => {
    const [getApi, setGetApi] = useState([]);

    useEffect(() => {
        fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo',
            { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setGetApi(data)
            })
    }, [])

    console.log(getApi);
    return (
        <div>
            Hello
        </div>
    )
}

export default ApiFetch
