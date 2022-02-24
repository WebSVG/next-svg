import Head from 'next/head'
import React, { useRef, useState, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Modal,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';

import PanZoomModal from '../components/PanZoomModal'
import * as utl from './svg_utils'

import { SVG as SVGjs } from '@svgdotjs/svg.js'
import SVG from 'react-inlinesvg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90vw",
  height: "80vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden'
};

//https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

export default function PanZoom({src}) {
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const height = 400
  const minZoom = 0.1
  const boxRef = useRef(null);
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);


  function startSVG(){
    console.log(elementRef.current)
    if(!elementRef.current){
      return
    }
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    if(svg){
      let div = document.getElementById("tiger")
      console.log(`startSVG div = ${div}`)
      console.log(div)
      panzoomRef.current = panzoom(elementRef.current, { minZoom,maxZoom: 4});
      setStarted(true)
      console.log("created Modal pan zoom")
    }else{
      console.warn("not svg, fetching width height not supported yet, set fixed to 800,600")
    }
      return () => { stopSVG() }
  }
  function stopSVG(){
    console.log(`Modal: stopSVG panzoomRef.current=${panzoomRef.current}`)
    if(panzoomRef.current){
      panzoomRef.current.dispose();
      setStarted(false)
      console.log(`Modal: disposed`)
    }
  }
  function get_svg_size(){
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    let bbox = svg.getBBox();
    return {svg_width:bbox.width,svg_height:bbox.height}
  }
  
  useEffect(() => {
    if(loaded){
      if(!started){
        startSVG(elementRef.current,panzoomRef.current,minZoom)
        setStarted(true)
      }
    }
  }, [loaded]);
  function Reset(e){
    console.log(panzoomRef.current)
    if(! panzoomRef.current) return
    panzoomRef.current.dispose();
    panzoomRef.current = panzoom(elementRef.current, { minZoom: minZoom,maxZoom: 4});
    console.log("reset")

  }
  function softReset(e){
    if(! panzoomRef.current) return
    panzoomRef.current.zoomAbs(0, 0, 1);
    panzoomRef.current.moveTo(0, 0);
  }
  function Center(e){
    if(! panzoomRef.current) return
    Reset()
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    //let cbox = svg.getBoundingClientRect();
    let {svg_width, svg_height} = get_svg_size()
    let scale = boxRef.current.clientWidth / svg_width
    if(svg.hasAttributeNS(null,"width")){
      let client_width = svg.getAttributeNS(null,"width")
      if(client_width.endsWith("px")){
        client_width = Number(client_width.slice(0,-2))
      }
      scale = client_width / svg_width
    }
    let offsetY         = boxRef.current.clientHeight/2 - (svg_height*scale)/2
    let offsetX         = boxRef.current.clientWidth/2 - (svg_width*scale)/2
    panzoomRef.current.moveTo(offsetX, offsetY);
    console.log(`moveto (${offsetX},${offsetY})`)
  }
  function FitHeight(e){
    if(! panzoomRef.current) return
    Reset()
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    //let cbox = svg.getBoundingClientRect();
    let {svg_width, svg_height} = get_svg_size()
    let scale = boxRef.current.clientWidth / svg_width
    if(svg.hasAttributeNS(null,"width")){
      let client_width = svg.getAttributeNS(null,"width")
      if(client_width.endsWith("px")){
        client_width = Number(client_width.slice(0,-2))
      }
      scale = client_width / svg_width
    }
    //console.log(`scale = ${scale}`)
    let offsetY         = boxRef.current.clientHeight/2 - (svg_height*scale)/2
    let offsetX         = boxRef.current.clientWidth/2 - (svg_width*scale)/2
    panzoomRef.current.moveTo(offsetX, offsetY);
    //console.log(`moveTo (${offsetX},${offsetY})`)

    let cbox = svg.getBoundingClientRect();
    let zoomX           = boxRef.current.clientWidth/2
    let zoomY           = boxRef.current.clientHeight/2
    let fit_height_zoom  = boxRef.current.clientHeight/(svg_height*scale)
    panzoomRef.current.zoomAbs(zoomX, zoomY, fit_height_zoom);
    //console.log(`zoomAbs (${zoomX},${zoomY},${fit_height_zoom})`)
  }
  function FitWidth(e){
    if(! panzoomRef.current) return
    Reset()
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    //let cbox = svg.getBoundingClientRect();
    let {svg_width, svg_height} = get_svg_size()
    let scale = boxRef.current.clientWidth / svg_width
    if(svg.hasAttributeNS(null,"width")){
      let client_width = svg.getAttributeNS(null,"width")
      if(client_width.endsWith("px")){
        client_width = Number(client_width.slice(0,-2))
      }
      scale = client_width / svg_width
    }
    //console.log(`scale = ${scale}`)
    let offsetY         = boxRef.current.clientHeight/2 - (svg_height*scale)/2
    let offsetX         = boxRef.current.clientWidth/2 - (svg_width*scale)/2
    panzoomRef.current.moveTo(offsetX, offsetY);
    //console.log(`moveTo (${offsetX},${offsetY})`)

    let cbox = svg.getBoundingClientRect();
    let fit_width_zoom  = boxRef.current.clientWidth/(svg_width*scale)
    let zoomX           = boxRef.current.clientWidth/2
    let zoomY           = boxRef.current.clientHeight/2
    panzoomRef.current.zoomAbs(zoomX, zoomY, fit_width_zoom);
  }
  function TestSVGjs(e){
    let svg = elementRef.current.getElementsByTagName('svg')[0]
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
        <Button onClick={FitHeight} variant="contained">Fit Height</Button>
        <Button onClick={FitWidth} variant="contained">Fit Width</Button>
        <Button onClick={Reset} variant="contained">Reset</Button>
        <Button onClick={Center} variant="contained">Center</Button>
        <Button onClick={TestSVGjs} variant="contained">Test SVG.js</Button>
        <Button onClick={handleOpen} variant="contained">Open modal</Button>
    </Stack>
    <Box id="mainContent" m={1} >
        <Paper elevation={3} >
            <Box ref={boxRef} sx={{ height:height, overflow: 'hidden' }}>
                <div ref={elementRef}>
                  <SVG src={src} onLoad={()=>{setLoaded(true)}}/>
                </div>
            </Box>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={handleClose}/>
    </Stack>
  )
}
