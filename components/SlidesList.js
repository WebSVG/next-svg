import { useState, useCallback} from 'react';
import PanZoomSlide from '../components/PanZoomSlide'
import {Box, Grid,Slider } from '@mui/material';

//TODO manage storage to keep last slides size
// reFit SVGs after change

export default function SlidesList({list}) {
  const minWidth = 400
  const [width,setWidth] = useState(minWidth)
  const [maxWidth,setMaxWidth] = useState(minWidth)
  const boxRef = useCallback(node=>{
    if(node!=null){
      setMaxWidth(node.clientWidth-60)
    }
  })
  const height = Math.round(width/2)

  return (
    <Box mb={2} ref={boxRef}>
      <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        valueLabelDisplay="auto"
        step={200}
        marks
        min={minWidth}
        max={maxWidth}
        onChange={(e,newValue)=>{setWidth(newValue)}}
      />
    </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="space-evenly">
        {list.map((file,index)=>
          <Grid item key={index} xs={2} sx={{minWidth:width}}>
            <PanZoomSlide src={file} height={height} menu/>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
