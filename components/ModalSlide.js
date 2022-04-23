import React, { useRef, useState, useCallback } from 'react';
import panzoom from 'panzoom';
import { Modal,Box, Button,Stack } from '@mui/material';
import * as utl from './pz_utils'
import SVG from 'react-inlinesvg';
import CloseIcon from '@mui/icons-material/Close';
import config from '../next.config'
import InteractiveSlide from './InteractiveSlide'

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

export default function ModalSlide({src,open,closeModal}) {
  
  return (
      <Modal
      open={open}
      onClose={()=>{closeModal();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <InteractiveSlide src={src} closeModal={closeModal} menu isModal={true}/>
      </Box>
    </Modal>
  )
}
