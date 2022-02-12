import Head from 'next/head'
import React, { useRef, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';
import Tiger from '../../public/tiger.svg';

export default function PanZoom() {
  const height = 300
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  useEffect(() => {
    panzoomRef.current = panzoom(elementRef.current, { minZoom: .25,maxZoom: 4});
      return () => {panzoomRef.current.dispose();}
  }, []);
  function Adjust(e){
    //panzoomRef.current.setTransformOrigin({x: 0.5, y: 0.5}); 
    panzoomRef.current.smoothZoom(0, 0, 1);
  }
  function Fit(e){
    let svg = document.getElementById('tiger');
    let h = svg.getAttributeNS(null,"height")
    let offsetX = document.getElementById("allCard").clientWidth/2
    panzoomRef.current.smoothZoom(offsetX, 0, height/h);
  }
  return (
    <>
      <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack mt={1}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="center"
        >
            <Button  onClick={Fit} variant="contained">Fit</Button>
            <Button  onClick={Adjust} variant="contained">100%</Button>
        </Stack>
        <Box id="mainContent" m={1} >
          <Paper elevation={3} >
              <Box id="allCard" px={2} pt={1} sx={{ height:height, overflow: 'hidden' }}>
                  <div ref={elementRef}>
                  <Tiger id="tiger"/>
                  </div>
                  </Box>
          </Paper>
        </Box>
      </Stack>
    </>
  )
}
