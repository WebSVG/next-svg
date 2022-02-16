import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'
import Tiger from '../public/tiger.svg';

export default function PanZoom() {
  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <PanZoomComp>
        <Tiger id="tiger"/>
      </PanZoomComp>      
    </>
  )
}
