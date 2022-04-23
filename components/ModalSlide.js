import { Modal } from '@mui/material';
import InteractiveSlide from './InteractiveSlide'

export default function ModalSlide({src,open,closeModal}) {
  
  return (
      <Modal
      open={open}
      onClose={()=>{closeModal();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
     <InteractiveSlide src={src} closeModal={closeModal} menu isModal={true}/>
    </Modal>
  )
}
