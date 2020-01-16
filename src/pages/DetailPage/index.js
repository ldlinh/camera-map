import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
const Detail = () => {

    const [data, setData] = useState({})

    const addScript = () => {
        const script = document.createElement("script")
        script.type = 'text/javascript'
        script.text = `function showCamera(ws) {
                            var canvas = document.getElementById('videoCanvas')
                            var player = new JSMpeg.Player(ws, {canvas:canvas, autoplay:true,audio:false,loop: true })
                        }`
        document.body.appendChild(script)
    }
    useEffect(() => {
        setData({hostname: "ws://192.168.10.72:9998"})
        addScript()
        window.showCamera("ws://192.168.10.72:9998")
    }, [])
    
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
<canvas style={{height: '360px'}} id="videoCanvas"></canvas>
</Grid>
    )
}

export default Detail