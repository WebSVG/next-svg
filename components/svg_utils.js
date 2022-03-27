import panzoom from 'panzoom';
import { SVG as SVGjs } from '@svgdotjs/svg.js'
import config from '../next.config'

function search_to_query(search){
  return JSON.parse('{"' + decodeURI(search.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
}

function get_svg_id(src){
  let el = document.getElementById(src)
  if(!el){
    return null
  }
  if(el.tagName == "OBJECT"){
    //console.log(el)
    //console.log(el.contentDocument)
    //console.log(el.contentDocument.getElementsByTagName('svg')[0])
    //  console.log(el.getSVGDocument())
    //https://www.w3.org/TR/SVG2/struct.html#InterfaceGetSVGDocument
    //.getElementsbyTagName("svg")[0]
    return document.getElementById(src).contentDocument.getElementsByTagName('svg')[0]
  }
  else if(el.tagName == "svg"){
    return el
  }
}

function get_svg_size(src){
  let svg = get_svg_id(src)
  let bbox = svg.getBBox();
  return {svg_width:bbox.width,svg_height:bbox.height}
}


function softReset(pzRef){
  if(! pzRef) return
  pzRef.zoomAbs(0, 0, 1);
  pzRef.moveTo(0, 0);
}

function Reset(pzRef,divRef,zoomOptions){
  if(! pzRef) return null
  pzRef.dispose();
  return panzoom(divRef, zoomOptions);
}

function Center(src,pzRef,boxRef){
  if(! pzRef) return null
  //pzRef = Reset(pzRef,divRef,zoomOptions)
  softReset(pzRef)
  let svg = get_svg_id(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  console.log(`moveto (${offsetX},${offsetY})`)
  return
}

function FitHeight(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = get_svg_id(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  let fit_height_zoom  = boxRef.clientHeight/(svg_height*scale)
  pzRef.zoomAbs(zoomX, zoomY, fit_height_zoom);
  //console.log(`zoomAbs (${zoomX},${zoomY},${fit_height_zoom})`)
}
function FitWidth(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = get_svg_id(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let fit_width_zoom  = boxRef.clientWidth/(svg_width*scale)
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}

function Fit(src,pzRef,boxRef){
  if(! pzRef) return
  //console.log("running fit")
  let {svg_width, svg_height} = get_svg_size(src)
  let svg_ratio = svg_width / svg_height
  let box_ratio = boxRef.clientWidth / boxRef.clientHeight
  if(svg_ratio > box_ratio){
    FitWidth(src,pzRef,boxRef)
  }else{
    FitHeight(src,pzRef,boxRef)
  }
}
function Top(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = get_svg_id(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, 0);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let fit_width_zoom  = boxRef.clientWidth/(svg_width*scale)
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}

async function fetch_json(json_filename){
  const response = await fetch(`${config.basePath}/${json_filename}`)
  return await response.json()
}

function setup_links(svg_id,json_data){
    let svg = get_svg_id(svg_id)
    if(svg){
      let draw = SVGjs(svg)
      let text_nodes = draw.find('text')
      let text_array = [ ...text_nodes ];
      text_array.forEach((text)=>{
        const key = text.node.innerHTML
        if(key in json_data){
          //text.linkTo(json_data[key])//link in same page
          text.linkTo((link)=>{link.to(json_data[key]).target('_blank')})//link in new page
          text.css({'text-decoration': 'underline'})  
        }
      })
      //text.fill('#f06')
    }
    return
}

function flash_links(text_list,duration){
  text_list.forEach((text)=>{
    text.fill({color:'red'})
    setTimeout(()=>{
      text.fill({color:'#05236e'})  
    },duration)
  })
}

function get_title(svg_id){
      let svg = get_svg_id(svg_id)
      if(!svg){
        return ""
      }
      let title = ""
      let draw = SVGjs(svg)
      let title_nodes = draw.find('title')
      let title_array = [ ...title_nodes ];
      if(title_array.length > 0){
        title = title_array[0].node.innerHTML
      }
      return title
}

function has_model(src){
  if(src == "long_diag2.svg"){
    return true
  }else if(src == "nRF52.svg"){
    return true
  }else{
    return false
  }
}

export{
  Fit,
  Top,
  softReset,
  Reset,
  Center,
  FitHeight,
  FitWidth,
  setup_links,
  flash_links,
  get_svg_id,
  get_title,
  fetch_json,
  has_model,
  search_to_query
}
