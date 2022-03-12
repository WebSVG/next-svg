import Head from 'next/head'
import PanZoomThumbsList from '../components/PanZoomThumbsList'
import Tiger from '../public/tiger.svg'

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
      <PanZoomThumbsList list={svg_list} thumbnails={true}/>
      <Tiger id="pz-tiger2.svg"/>
    </>
  )
}