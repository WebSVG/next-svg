import Head from 'next/head'
import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  
  const minZoom = 0.1
  const panzoomRef = useRef(null);
  const elementSvg = useRef(null);
  const elementDiv = useCallback(node=>{
    console.log(`Modal: loaded = ${loaded} ; started.current = ${started.current} ; node = ${node}`)
    if(node != null){
      if(loaded){
        if(!started.current){startSVG(node)}
      }
    }},[loaded,open]);

  function startSVG(node){
    console.log(node)
    if(!node){
      return
    }
    //if(elementDiv.current){
      panzoomRef.current = panzoom(node, { minZoom,maxZoom: 4});
      started.current=true
      console.log("created Modal pan zoom")
    //}else{
    //  console.log(elementDiv.current)
    //}
      return () => { stopSVG() }
  }
  function stopSVG(){
    console.log(`Modal: stopSVG panzoomRef.current=${panzoomRef.current}`)
    if(panzoomRef.current){
      panzoomRef.current.dispose();
      started.current=false
      console.log(`Modal: disposed`)
    }
  }
  
//  useEffect(() => {
//    console.log(`Modal: loaded = ${loaded} ; started.current = ${started.current} ; panzoomRef.current = ${panzoomRef.current}`)
//    if(loaded){
//      if(!started.current){
//        setTimeout(() => {
//          startSVG()
//        }, 500);
//      }
//    }
//  }, [loaded,open]);

  return (
      <Modal
      open={open}
      onClose={()=>{console.log("Modal handling close"); stopSVG();handleClose();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <div ref={elementDiv} id="tiger">
          <SVG ref={elementSvg} src={src} onLoad={()=>{setLoaded(true)}}/>
        </div>
      </Box>
    </Modal>
  )
}
