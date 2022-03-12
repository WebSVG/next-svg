import Head from 'next/head'
import PanZoomList from '../components/PanZoomList'
import {Typography  } from '@mui/material';
import Tiger from '../public/tiger.svg'
import Diagram from '../public/long_diag.svg'

const svg_list =[
  'tiger2.svg',
  'Linux_kernel_map.svg',
  'long_diag.svg',
  'tiger.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
]

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography p={1}>This example shows integration of a gallery in a page where svg and images are part of external html elements. ids inherited from filenames are used for linking</Typography>
      <PanZoomList list={svg_list} thumbnails={true} default_expanded={false}/>
      <Tiger id="pz-tiger2.svg"/>
      <Diagram id="pz-long_diag.svg"/>
    </>
  )
}
