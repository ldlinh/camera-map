import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Grid, Box } from '@material-ui/core'
import axios from 'axios'
const Detail = ({match}) => {

    const [data, setData] = useState({})
    const { id } = match.params
    useEffect(() => {
        axios.get(`http://192.168.10.72:8092/device/${id}/details`).then(res => setData(res.data.data))
    }, [match])
    return (
        <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  style={{
      height: '900px'
  }}
>
    <ReactPlayer url={data.url} playing controls/>
</Grid>
    )
}

export default Detail