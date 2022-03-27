import React, { useRef, useState, useEffect} from 'react';
import panzoom from 'panzoom';
import {    Paper, Box, Stack, Button, Typography } from '@mui/material';
import PanZoomModal from '../components/PanZoomModal'
import * as utl from './svg_utils'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LinkIcon from '@mui/icons-material/Link';
import {useRouter} from 'next/router';
import config from '../next.config'

export default function PanZoomSlide({src,menu=false,width=600}) {
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false);
  const [height,setHeight] = useState(Math.round(width/2))
  const [title,setTitle] = useState(src.replace(/\.[^/.]+$/, ""))
  const router = useRouter()

  const zoomOptions = {
    minZoom: 0.1,
    maxZoom:4
    }
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const stackRef = useRef(null);

  function startPZ(){
    //console.log("adding listener")
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      if(utl.get_svg_id(src)){//protect against mysterious react reload cases
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
  function openModal(){
    if(!open){
      //element.scrollTo(0,100)//not effective
      router.push(`${router.pathname}#pz-${src}?modal=${src}`)//,{scroll:false} not effective
      setOpen(true)
    }
  }
  function closeModal(){
    const url = `${router.pathname}#pz-${src}`
    router.push(url,url,{scroll:false})
    setOpen(false)
  }
  function onHashChangeStart(url){
    //not catching paste of same url with new search query params
    //from : http://localhost:3000/#pz-Linux_kernel_map.svg
    //to : http://localhost:3000/#pz-Linux_kernel_map.svg?modal=Linux_kernel_map.svg
    console.log(url)
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
  //TODO update basePath fom config in this file and in svg_utils line 162
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
          <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          >
            <Button sx={{zIndex:'modal',backgroundColor:'#ffffffaa'}} onClick={()=>{setLink()}} variant="text"><LinkIcon/></Button>
            <Button sx={{zIndex:'modal',backgroundColor:'#ffffffaa'}} onClick={()=>{openModal()}} variant="text"><FullscreenIcon/></Button>
          </Stack>
        </Stack>
        }
            <Box ref={boxRef} 
                 sx={{  height:height,  position:'relative'}}>
                <div ref={divRef} >
                  <object type="image/svg+xml" data={`${config.basePath}/${src}`} id={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
            </Stack>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{closeModal()}}/>
    </>
  )
}
