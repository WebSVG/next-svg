import Head from 'next/head'
import React, { useRef, useState, useEffect, useCallback } from 'react';
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

  const boxHeight = 400
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);

  function startPZ(){
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      console.log("pan zoom : created")
    }
  }
  function stopPZ(){
    //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      if(divRef.current){
        divRef.current.removeEventListener("mouseenter",startPZ)
      }
      console.log(`pan zoom : disposed`)
    }
  }
  
  useEffect(() => {
    if(loaded && divRef.current){
      console.log("adding listener")
      divRef.current.addEventListener("mouseenter", startPZ)
    }
    return () => { stopPZ() }
  }, [loaded]);
  function TestSVGjs(e){
    let svg = divRef.current.getElementsByTagName('svg')[0]
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
        <Button onClick={()=>{utl.FitHeight(panzoomRef.current,divRef.current,boxRef.current)}}
                variant="contained">Fit Height</Button>
        <Button onClick={()=>{utl.FitWidth(panzoomRef.current,divRef.current,boxRef.current)}}
                variant="contained">Fit Width</Button>
        <Button onClick={()=>{utl.softReset(panzoomRef.current)}}
                variant="contained">Reset</Button>
        <Button onClick={(e)=>{utl.Center(panzoomRef.current,divRef.current,boxRef.current)}}
                variant="contained">Center</Button>
        <Button onClick={TestSVGjs} variant="contained">Test SVG.js</Button>
        <Button onClick={()=>{setOpen(true)}} variant="contained">Open modal</Button>
    </Stack>
    <Box id="mainContent" m={1} >
        <Paper elevation={3}>
            <Box ref={boxRef} sx={{ height:boxHeight, overflow: 'hidden' }}>
                <div ref={divRef} >
                  <SVG src={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{setOpen(false)}}/>
    </Stack>
  )
}
