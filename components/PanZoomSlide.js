import React, { useRef, useState, useEffect} from 'react';
import panzoom from 'panzoom';
import {    Paper, Box, Stack, Button, Typography } from '@mui/material';
import PanZoomModal from '../components/PanZoomModal'
import * as utl from './svg_utils'
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function PanZoomSlide({src,menu=false,width=600}) {
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false);
  const [height,setHeight] = useState(Math.round(width/2))
  const [title,setTitle] = useState(src.replace(/\.[^/.]+$/, ""))

  const zoomOptions = {
    minZoom: 0.1,
    maxZoom:4
    }
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const stackRef = useRef(null);

  function onComponentUnmount(){
    stopPZ()
    //console.log("removing listener")//TODO not clear why this runs on startup before Mount ?
  }

  function startPZ(){
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      utl.Fit(src,panzoomRef.current,boxRef.current)
      //panzoomRef.current.on('transform', function(e) {});
      //console.log("pan zoom : created")
    }
  }
  function stopPZ(){
    //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      //console.log(`pan zoom : disposed`)
    }
  }
  
  useEffect(()=>{
    //console.log(`width is now (${width})`)
    const target_height = Math.round(width/2)
    if(height!=target_height){  //1) height only mismatch if width has changed
      setHeight(target_height)
    }else{                    //2) height match, already applied after render
      //console.log(`fitting '${src}' now with new width (${width})`)
      utl.Fit(src,panzoomRef.current,boxRef.current)
    }
  },[height,width])

  useEffect(() => {
    if((loaded) && (divRef.current) && (!started.current)){
      //console.log("adding listener")
      let svg = utl.get_svg_id(src)
      if(svg != null){
        startPZ()
        stopPZ()
        let new_title = utl.get_title(src)
        if(new_title){
          setTitle(new_title)
        }
        if(utl.has_model(src)){
          utl.fetch_json(src.replace(".svg",".json")).then((model)=>{
            utl.setup_links(src,model)
          })
        }
      }
    }
    return onComponentUnmount
  }, [loaded]);
  return (
    <>
    <Box id="mainContent" m={1} sx={{width:width}}>
      <Paper elevation={1} sx={{ overflow: 'hidden'}}>
        <Stack  id={`pz-${src}`} ref={stackRef}>
        {menu&&
          <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          >
          <Typography variant="h6" p={1}>{title}</Typography>
          <Button sx={{zIndex:'modal',backgroundColor:'#ffffffaa'}} onClick={()=>{setOpen(true)}} variant="text"><FullscreenIcon/></Button>
        </Stack>
        }
            <Box ref={boxRef} 
                 sx={{  height:height,  position:'relative'}}>
                <div ref={divRef} >
                  <object type="image/svg+xml" data={src} id={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
            </Stack>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{setOpen(false)}}/>
    </>
  )
}
