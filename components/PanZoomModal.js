import React, { useRef, useState, useCallback } from 'react';
import panzoom from 'panzoom';
import { Modal,Box, Button,Stack } from '@mui/material';
import * as utl from './svg_utils'
import SVG from 'react-inlinesvg';
import CloseIcon from '@mui/icons-material/Close';
import config from '../next.config'

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
  p: 2,
  overflow: 'hidden',
  cursor: 'grab'
};

const buttonActiveStyle = {
  zIndex: 'modal',
  color:'#0036bb',
  backgroundColor:'#ffffff',
  position: 'absolute',
  right: '1%',
  top:'1%'
}

const buttonRestStyle = {
  zIndex: 'modal',
  color:'#0036bb55',
  backgroundColor:'#ffffff55',
  '&:hover':{color:'#0036bb',backgroundColor:'#ffffff'},
  position: 'absolute',
  right: '1%',
  top:'1%'
}

export default function PanZoom({src,open,handleClose}) {
  const text_list = useRef(new Array())
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [buttonActive, setButtonActive] = useState(true)
  
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const panzoomRef = useRef(null)
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const buttonRef = useRef(null);
  const modal_src = `modal-${src}`

  const divMeasure = useCallback(node=>{
    divRef.current = node
    startPZ()
    },[loaded,open]);

  const boxMeasure = useCallback(node=>{
    boxRef.current = node
    startPZ()
    },[loaded,open]);
  function on_svg_pz_ready(){
    utl.Fit(modal_src,panzoomRef.current,boxRef.current)
    console.log("Modal pan zoom : created")
    if(utl.has_model(src)){
      utl.fetch_json(src.replace(".svg",".json")).then((model)=>{
        utl.setup_links(modal_src,model)
      })
    }
  }
  function startPZ(){
    //console.log(`divRef.current:${divRef.current} ; boxRef.current:${boxRef.current} ; loaded:${loaded} ; started.current:${started.current}`)
    if((divRef.current != null) && (boxRef.current != null) && (loaded) && (!started.current)){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current=true
      setButtonActive(true)
      setTimeout(()=>{setButtonActive(false)},2000)
      if(utl.get_svg_id(modal_src)){//protect against mysterious react reload cases
        on_svg_pz_ready()
      }
    }
    return
  }
  function stopPZ(){
    //console.log(`Modal: stopPZ panzoomRef.current=${panzoomRef.current}`)
    if(panzoomRef.current){
      panzoomRef.current.dispose();
      started.current=false
      console.log(`Modal pan zoom : disposed`)
    }
  }
  
  return (
      <Modal
      open={open}
      onClose={()=>{stopPZ();handleClose();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box ref={boxMeasure} sx={style} >
        <Button ref={buttonRef} onClick={()=>{stopPZ();handleClose();}}
              variant="conained"
              sx={buttonActive?buttonActiveStyle:buttonRestStyle}
                ><CloseIcon/></Button>
        <div ref={divMeasure}>
          <SVG src={`${config.basePath}/${src}`} id={modal_src} onLoad={()=>{setLoaded(true)}}/>
        </div>
        </Box>
    </Modal>
  )
}
