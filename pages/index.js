import Head from 'next/head'
import SlidesList from '../components/SlidesList'
import {Typography  } from '@mui/material';
import images_list from './slides_files.json'
import config from '../next.config'

const description = `This example shows how to create a list of interactive Slides out of an svg images files list`

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href={`${config.basePath}/favicon.ico`} />
      </Head>
      <Typography p={1}>{description}</Typography>
      <SlidesList list={images_list}/>
    </>
  )
}
