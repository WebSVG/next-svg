import React, { useRef, useState, useEffect} from 'react';
import panzoom from 'panzoom';
import { Paper,Stack,Box,Typography,Button } from '@mui/material';
import * as utl from './pz_utils'
import {useRouter} from 'next/router';
import config from '../next.config'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LinkIcon from '@mui/icons-material/Link';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import HeightIcon from '@mui/icons-material/Height';
import SVG from 'react-inlinesvg';

function IntegratedMenu({title, fitWidth, fitHeight, setLink, openModal}){
  return(
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      >
      <Typography variant="h6" p={1}>{title}</Typography>
      <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      >
        <Button onClick={fitHeight} variant="text"><HeightIcon/></Button>
        <Button onClick={fitWidth} variant="text"><SmartButtonIcon/></Button>
        <Button onClick={setLink} variant="text"><LinkIcon/></Button>
        <Button onClick={openModal} variant="text"><FullscreenIcon/></Button>
      </Stack>
    </Stack>    
  )
}

export default function InteractiveSlide({src,width=600,menu,openModal,isModal}) {
  const started = useRef(false)
  const [height,setHeight] = useState(Math.round(width/2))
  const [title,setTitle] = useState(src.replace(/\.[^/.]+$/, ""))
  const router = useRouter()
  const is_svg = src.endsWith(".svg")
  const is_img = !is_svg
  const [loaded, setLoaded] = useState(false)//images loaded by default
  const zoomOptions = {
    minZoom: 0.1,
    maxZoom:4
    }
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const modal_src = `modal-${src}`


  function fitWidth(){
    utl.FitWidth(src,panzoomRef.current,boxRef.current)
  }
  function fitHeight(){
    utl.FitHeight(src,panzoomRef.current,boxRef.current)
  }

  function startPZ(){
    //console.log("adding listener")
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      if(is_img || utl.get_svg_id(src)){//protect against mysterious react reload cases
        on_svg_pz_ready()
      }
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
  function on_svg_pz_ready(){
    if(is_img){
      console.log("fitting image")
    }
    if(is_svg){
      console.log("fitting svg")
    }
    utl.Fit(src,panzoomRef.current,boxRef.current)
    if(utl.has_model(src)){
      utl.fetch_json(src.replace(".svg",".json")).then((model)=>{
        utl.setup_links(src,model)
      })
    }

    let new_title = utl.get_title(src)
    if(new_title){
      setTitle(new_title)
    }
    if(utl.has_model(src)){
      utl.fetch_json(src.replace(".svg",".json")).then((model)=>{
        utl.setup_links(src,model)
      })
    }
    //console.log(location.search)//empty
    //why not useRouter, because it has a bug : https://github.com/vercel/next.js/discussions/13220
    const query_list = router.asPath.split('?')
    if(query_list.length == 2){
      const query = utl.search_to_query(query_list[1])
      if(("modal" in query) && query.modal === src){
        openModal()
      }
    }
  }
  function setLink(){
    router.push(`${router.pathname}#pz-${src}`)
  }
  function onComponentUnmount(){
    stopPZ()
    //router.events.off("hashChangeStart", onHashChangeStart);
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
      startPZ()
      stopPZ()
      //router.events.on("hashChangeStart", onHashChangeStart);
    }
    return onComponentUnmount
  }, [loaded]);
  function onLoad(){
    console.log(`onLoad : img ${is_img}`)
    setLoaded(true)
  }//Issue Failing for img, not being triggered - emulated with timeout
  if(is_img){
    setTimeout(()=>{setLoaded(true)},0)
  }

  //TODO update basePath fom config in this file and in pz_utils line 162
  return (
    <Box m={1} sx={{width:width}}>
      <Paper elevation={1} sx={{ overflow: 'hidden'}}>
        <Stack  id={`pz-${src}`}>
          {menu&&
            <IntegratedMenu title={title} fitWidth={fitWidth} fitHeight={fitHeight} seLink={setLink} openModal={openModal}/>
          }    
          <Box ref={boxRef} 
                sx={{  height:height,  position:'relative', overflow:'hidden'}}>
              <div ref={divRef} >
                {is_svg&&
                  (isModal?
                    <SVG src={`${config.basePath}/${src}`} id={modal_src} onLoad={onLoad}/>:
                    <object type="image/svg+xml" data={`${config.basePath}/${src}`} id={src} onLoad={onLoad}
                    />)
                }
                {is_img&&
                <img src={`${config.basePath}/${src}`} id={src} onLoad={onLoad}/>
                }
              </div>
          </Box>
        </Stack>
      </Paper>
    </Box>    
  )
}
