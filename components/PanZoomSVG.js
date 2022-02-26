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
  const handleOpen = () => setOpen(true);
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
  function get_svg_size(){
    let svg = elementDiv.current.getElementsByTagName('svg')[0]
    let bbox = svg.getBBox();
    return {svg_width:bbox.width,svg_height:bbox.height}
  }
  
  useEffect(() => {
    if(loaded){
      if(!started.current){
        startPZ()
        started.current = true
      }
    }
  }, [loaded]);
  function Reset(){
    if(! panzoomRef.current) return
    panzoomRef.current.dispose();
    panzoomRef.current = panzoom(elementDiv.current, zoomOptions);
    console.log("reset")
  
  }
    function Center(e){
    if(! panzoomRef.current) return
    panzoomRef.current = utl.Reset(panzoomRef.current,elementDiv.current, zoomOptions)
    //Reset()
    let svg = elementDiv.current.getElementsByTagName('svg')[0]
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
    let svg = elementDiv.current.getElementsByTagName('svg')[0]
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
    let svg = elementDiv.current.getElementsByTagName('svg')[0]
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
        <Button onClick={FitHeight} variant="contained">Fit Height</Button>
        <Button onClick={FitWidth} variant="contained">Fit Width</Button>
        <Button onClick={()=>{utl.Reset(panzoomRef.current,elementDiv.current, zoomOptions)}}
                variant="contained">Reset</Button>
        <Button onClick={(e)=>{panzoomRef.current = utl.Center(panzoomRef.current,elementDiv.current,boxRef.current,zoomOptions)}}
                variant="contained">Center</Button>
        <Button onClick={TestSVGjs} variant="contained">Test SVG.js</Button>
        <Button onClick={handleOpen} variant="contained">Open modal</Button>
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
