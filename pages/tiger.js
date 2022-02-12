import Head from 'next/head'
import React, { useRef, useEffect, useState } from 'react';
import Script from 'next/script'
import dynamic from 'next/dynamic'

import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';

export default function Home() {
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);
  const height = 300

  // Set up panzoom on mount, and dispose on unmount
  useEffect(() => {
    return () => {
      console.log(panzoomRef.current)
      if(panzoomRef.current){
        panzoomRef.current.destroy();
      }
    }
  }, []);
  return (
      <>
        <Script src='/dist/svg-pan-zoom.js'
          onLoad={() => {
            if(typeof window !== "undefined"){
              panzoomRef.current = svgPanZoom(elementRef.current);
            }
          }}
        />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box id="mainContent" m={1}>
        <Paper elevation={3} >
        <Box id="allCard" px={2} pt={1} sx={{ height:height,width:900, overflow: 'hidden' }}>
            <embed type="image/svg+xml" src="/tiger.svg" ref={elementRef}/>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
