import Head from 'next/head'
import PanZoomSVG from '../components/PanZoomSVG'
import SVG from 'react-inlinesvg';
import {useState} from 'react';

const svg_list =[
  'nRF52.svg',
]

export default function PanZoom() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {svg_list.map((file,index)=>
        <PanZoomSVG key={index} loaded={loaded}>
          <SVG src={file} onLoad={()=>{setLoaded(true)}}/>
        </PanZoomSVG>
      )}
    </>
  )
}
