import panzoom from 'panzoom';


function startSVG(element, pzref, minZoom){
    let svg = element.getElementsByTagName('svg')[0]
    if(svg){
      pzref = panzoom(element, { minZoom,maxZoom: 4});
    }else{
      console.warn("not svg, fetching width height not supported yet, set fixed to 800,600")
    }
    return () => {
        if(pzref){
            pzref.dispose();
        }
    }
}

export{
    startSVG
}
