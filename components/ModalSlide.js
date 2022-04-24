import { useRef, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import panzoom from 'panzoom';
import { Paper,Stack,Box,Typography,Button, Modal } from '@mui/material';
import * as utl from './pz_utils'
import config from '../next.config'
import SVG from 'react-inlinesvg';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LinkIcon from '@mui/icons-material/Link';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import CloseIcon from '@mui/icons-material/Close';
import HeightIcon from '@mui/icons-material/Height';

const modalBoxStyle = {
  position: 'absolute',
  overflow:'hidden',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "94vw",
  height: "94vh",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  p: 0
};

function MenuButtons({title, fitWidth, fitHeight, setLink, openModal,closeModal,isModal}){
  return(
    <Stack
      id="menu_stack"
      direction="row"
      spacing={2}
      justifyContent="space-between"
      sx={{backgroundColor:'#f5f5f5',zIndex:10}}
      >
      <Typography variant="h6" p={1}>{title}</Typography>
      <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
      >
        <Button onClick={fitHeight} variant="text"><HeightIcon/></Button>
        <Button onClick={fitWidth} variant="text"><SmartButtonIcon/></Button>
        {!isModal&&
        <Button onClick={setLink} variant="text"><LinkIcon/></Button>}
        {isModal?
          <Button onClick={closeModal} variant="text"><CloseIcon/></Button>:
          <Button onClick={openModal} variant="text"><FullscreenIcon/></Button>}
      </Stack>
    </Stack>    
  )
}

function PanZoomSlide({src,width=600,menu,openModal,closeModal,isModal,links}) {
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
  const image_id = isModal?`modal-${src}`:src

  function get_pz_size(){
    if(isModal){
      //in this case the Box does not have a defined width and height ans is hidden with the overflow so not useful
      let modal_stack = document.getElementById('modal_stack')
      let menu_stack = document.getElementById('menu_stack')
      return [modal_stack.clientWidth,modal_stack.clientHeight - menu_stack.clientHeight]
    }
    else{
      return [boxRef.current.clientWidth,boxRef.current.clientHeight]
    }
  }
  function fitWidth(){
    utl.FitWidth(image_id,panzoomRef.current,...get_pz_size())
  }
  function fitHeight(){
    utl.FitHeight(image_id,panzoomRef.current,...get_pz_size())
  }

  function startPZ(){
    console.log("startPZ() - isModal:${isModal}")
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      if(is_img || utl.get_svg_id(image_id)){//protect against mysterious react reload cases
        on_svg_pz_ready()
      }
    }
  }
  function stopPZ(){
    console.log(`stopPZ() panzoomRef.current=${panzoomRef.current} - isModal:${isModal}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      console.log(`pan zoom : disposed - isModal:${isModal}`)
    }
  }
  function on_svg_pz_ready(){
    utl.Fit(image_id,panzoomRef.current,...get_pz_size())
    if(links){
      utl.fetch_json(src.replace(".svg",".json")).then((model)=>{
        utl.setup_links(image_id,model)
      })
    }
    let new_title = utl.get_title(image_id)
    if(new_title){
      setTitle(new_title)
    }
    //console.log(location.search)//empty
    //why not useRouter, because it has a bug : https://github.com/vercel/next.js/discussions/13220
    if(!isModal){
      const query_list = router.asPath.split('?')
      if(query_list.length == 2){
        const query = utl.search_to_query(query_list[1])
        if(("modal" in query) && query.modal === src){
          openModal()
        }
      }
    }
    if(isModal){
      let box = boxRef.current
      console.log(box)
      console.log(`box.clientWidth:${box.clientWidth} ; box.clientHeight:${box.clientHeight}`)
      console.log(`box.offsetWidth:${box.offsetWidth} ; box.offsetHeight:${box.offsetHeight}`)
      let rect = box.getBoundingClientRect()
      console.log(`rect.width:${rect.width} ; rect.height:${rect.height}`)
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
      utl.Fit(image_id,panzoomRef.current,...get_pz_size())
    }
  },[height,width])

  useEffect(() => {
    if((loaded) && (divRef.current) && (!started.current)){
      startPZ()
      if(!isModal)stopPZ()
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

  return (
    isModal?
    <Stack  id="modal_stack" p={0} spacing={0} sx={modalBoxStyle} direction="column">
      {menu&&
        <MenuButtons
          title={title}
          fitWidth={fitWidth}
          fitHeight={fitHeight}
          setLink={setLink}
          openModal={openModal}
          closeModal={closeModal}
          isModal={true}
        />
      }    
      <Box id="modal_box" ref={boxRef} sx={{cursor:'grab'}}>
          <div ref={divRef} id="panzoom_div">
            {is_svg&&
                  <SVG src={`${config.basePath}/${src}`} id={image_id} onLoad={onLoad} />
            }
            {is_img&&
            <img src={`${config.basePath}/${src}`} id={image_id} onLoad={onLoad} draggable='false'/>
            }
          </div>
      </Box>
    </Stack>:
    <Box m={1} sx={{width:width}}>
      <Paper elevation={1} sx={{ overflow: 'hidden'}}>
        <Stack  id={`pz-${src}`}>
          {menu&&
            <MenuButtons
              title={title}
              fitWidth={fitWidth}
              fitHeight={fitHeight}
              setLink={setLink}
              openModal={openModal}
              closeModal={closeModal}
              isModal={false}
            />
          }    
          <Box ref={boxRef} sx={{  height:height,  position:'relative', userSelect:'none'}}>
              <div ref={divRef} id="panzoom_div">
                {is_svg&&
                      <object
                      type="image/svg+xml"
                      data={`${config.basePath}/${src}`}
                      id={image_id}
                      onLoad={onLoad}
                    />
                }
                {is_img&&
                <img src={`${config.basePath}/${src}`} id={image_id} onLoad={onLoad} draggable='false'/>
                }
              </div>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default function ModalSlide({src,open,links,closeModal}) {

  return (
    <>
    <Modal
      id="modal"
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div id="modal_div">{/*fix warning 'Failed prop type: Invalid prop ' */}
        <PanZoomSlide src={src} links={links} closeModal={closeModal} menu={true} isModal={true}/>
      </div>
    </Modal>
    </>
  )
}
