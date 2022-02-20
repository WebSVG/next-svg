import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'
import Tiger from '../public/tiger.svg'
import dynamic from 'next/dynamic'

const svg_list =[
  '../public/tiger.svg',
  '../public/vintage-flourish-divider-7.svg'  
]

const DynamicnRF52 = dynamic(() => import('../public/nRF52.svg'))
const DynamicTiger = dynamic(() => import('../public/tiger.svg'))
const DynamicVintage = dynamic(() => import('../public/vintage-flourish-divider-7.svg'))
//const DynamicTiger = dynamic(() => import(svg_list[0]))
//const DynamicVintage = dynamic(() => import(svg_list[1]))


const components = [DynamicnRF52, DynamicTiger, DynamicVintage]
//const components = svg_list.map((file)=>dynamic(() => import(file)))

export default function PanZoom() {
  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {components.map((Comp,index)=>
        <PanZoomComp key={index}>
          <Comp/>
        </PanZoomComp>      
      )}
    </>
  )
}
