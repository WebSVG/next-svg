import Head from 'next/head'
import React, { useRef, useState, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Modal,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';

import PanZoomModal from '../components/PanZoomModal'
import * as utl from './svg_utils'

import { SVG as SVGjs } from '@svgdotjs/svg.js'
import SVG from 'react-inlinesvg';

export default function PanZoom({src}) {
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const height = 400
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const boxRef = useRef(null);
  const elementDiv = useRef(null);
  const panzoomRef = useRef(null);


  function startPZ(){
    if(!elementDiv.current){
      return
    }
    panzoomRef.current = panzoom(elementDiv.current, zoomOptions);
    started.current = true
    console.log("created Modal pan zoom")
    return () => { stopPZ() }
  }
  function stopPZ(){
    console.log(`Modal: stopPZ panzoomRef.current=${panzoomRef.current}`)
    if(panzoomRef.current){
      panzoomRef.current.dispose();
      started.current = false
      console.log(`Modal: disposed`)
    }
  }
  
  useEffect(() => {
    if(loaded){
      if(!started.current){
        startPZ()
        started.current = true
      }
    }
  }, [loaded]);
  function TestSVGjs(e){
    let svg = elementDiv.current.getElementsByTagName('svg')[0]
    if(svg){
      let draw = SVGjs(svg)
      draw.rect(100, 100).fill('#f06')
      let text = draw.findOne('text')
      if(text){
        text.fill('#f06')
      }
    }
  }
  return (
    <Stack mt={1}>
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="center"
    >
        <Button onClick={()=>{utl.FitHeight(panzoomRef.current,elementDiv.current,boxRef.current)}}
                variant="contained">Fit Height</Button>
        <Button onClick={()=>{utl.FitWidth(panzoomRef.current,elementDiv.current,boxRef.current)}}
                variant="contained">Fit Width</Button>
        <Button onClick={()=>{utl.softReset(panzoomRef.current)}}
                variant="contained">Reset</Button>
        <Button onClick={(e)=>{utl.Center(panzoomRef.current,elementDiv.current,boxRef.current)}}
                variant="contained">Center</Button>
        <Button onClick={TestSVGjs} variant="contained">Test SVG.js</Button>
        <Button onClick={()=>{setOpen(true)}} variant="contained">Open modal</Button>
    </Stack>
    <Box id="mainContent" m={1} >
        <Paper elevation={3}>
            <Box ref={boxRef} sx={{ height:height, overflow: 'hidden' }}>
                <div ref={elementDiv} >
                  <SVG src={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={handleClose}/>
    </Stack>
  )
}
