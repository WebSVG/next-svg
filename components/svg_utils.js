import panzoom from 'panzoom';

function get_svg_size(divRef){
  let svg = divRef.getElementsByTagName('svg')[0]
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

function Center(pzRef,divRef,boxRef,zoomOptions){
  if(! pzRef) return null
  //pzRef = Reset(pzRef,divRef,zoomOptions)
  softReset(pzRef)
  let svg = divRef.getElementsByTagName('svg')[0]
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(divRef)
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
  return pzRef
}

export{
  Reset,
  Center
}
