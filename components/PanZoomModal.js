import Head from 'next/head'
import React, { useRef, useState, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Modal,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';


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

export default function PanZoom({src,open,handleClose}) {
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  
  const minZoom = 0.1
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
  
  useEffect(() => {
    console.log(`Modal: loaded = ${loaded} ; started = ${started} ; panzoomRef.current = ${panzoomRef.current}`)
    if(loaded){
      if(!started){
        setTimeout(() => {
          startSVG()
        }, 500);
      }
    }
  }, [loaded,open]);

  return (
      <Modal
      open={open}
      onClose={()=>{console.log("Modal handling close"); stopSVG();handleClose();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <div ref={elementRef} id="tiger">
          <SVG src={src} onLoad={()=>{setLoaded(true)}}/>
        </div>
      </Box>
    </Modal>
  )
}
