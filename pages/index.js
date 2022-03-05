import Head from 'next/head'
import PanZoomList from '../components/PanZoomList'

const svg_list =[
  'Linux_kernel_map.svg',
  'tiger2.svg',
  'tiger.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
]

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <PanZoomList list={svg_list} thumbnails={true}/>
    </>
  )
}
