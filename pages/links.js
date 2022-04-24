import Head from 'next/head'
import {Typography  } from '@mui/material';
import InteractiveSlide from '../components/InteractiveSlide'

const description = `adding links in SVG from a json file`

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography p={1}>{description}</Typography>
      <InteractiveSlide src="long_diag2.svg" width={600} links/>
      <InteractiveSlide src="nRF52.svg" width={600} links/>
    </>
  )
}
