import { useState} from 'react';
import InteractiveSlide from './InteractiveSlide'
import ModalSlide from './ModalSlide'
import {useRouter} from 'next/router';

export default function MenuSlide({src,menu=false,width=600}) {
  const [open, setOpen] = useState(false);
  const router = useRouter()

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

  return (
    <>
    <InteractiveSlide src={src} width={width} openModal={openModal} menu isModal={false}/>
    <ModalSlide src={src} open={open} handleClose={()=>{closeModal()}}/>
    </>
  )
}
