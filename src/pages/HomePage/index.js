import React, { useEffect, useState } from 'react'
import GoogleMap from '../../components/Map'
import socketIOClient from "socket.io-client"
import axios from 'axios'
const Home = () => {

    const [data, setData] = useState(null)

    const ENDPOINT = 'http://192.168.10.72:8092'

    const onMarkerClick = (id) => {
        window.open(`/camera/${id}/details`, "_blank")
    }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT)
        socket.on("UpdateStatus", response => {
            setData(response)
        })
        axios.get(`${ENDPOINT}/devices`).then(res => {
            setData(res.data.data)
        })

    }, [])
    return (
        <>
            <GoogleMap isMarkerShown onMarkerClick={onMarkerClick} markerList={data} />
        </>
    )
}

export default Home