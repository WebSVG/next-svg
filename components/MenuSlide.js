import { useState} from 'react';
import InteractiveSlide from './InteractiveSlide'
import {useRouter} from 'next/router';
import { Modal } from '@mui/material';

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
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InteractiveSlide src={src} closeModal={closeModal} menu isModal={true}/>
    </Modal>
    </>
  )
}
