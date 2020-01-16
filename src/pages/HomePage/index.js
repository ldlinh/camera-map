import React, { useEffect, useState } from 'react'
import GoogleMap from '../../components/Map'
const Home = () => {

    const [data, setData] = useState([])

    const onMarkerClick = (id) => {
        window.open(`/camera/${id}/details`, "_blank")
    }

    useEffect(() => {
        setData([
            { id: 1, lat: 10.7624939, lng: 106.7020087 },
            { id: 2, lat: 10.771548, lng: 106.7040435 }
        ])
    }, [])

    return (
        <>
            <GoogleMap isMarkerShown onMarkerClick={onMarkerClick} markerList={data} />
        </>
    )
}

export default Home