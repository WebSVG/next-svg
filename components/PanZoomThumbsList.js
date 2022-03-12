import { useCallback, useState, useEffect} from 'react';
import PanZoomSVG from '../components/PanZoomSVG'
import PanZoomThumb from '../components/PanZoomThumb'
import {Box, Paper, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Stack,Typography,Button,ListSubheader  } from '@mui/material';

//https://usehooks.com/useWindowSize/
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default function PanZoomThumbsList({list,thumbnails=false,thumb_width=200,slides=false}) {
  const [nbcols,setNbCols] = useState(3)
  const size = useWindowSize();

  const boxRef = useCallback(node=>{
    if(node != null){
      let col_width = thumb_width + 16      //+ImageList.gap + Box.padding
      let cwidth = node.clientWidth - 2 * 8 // minus padding
      let nb_cols = Math.floor(cwidth / col_width)
      //if(nb_cols>1){nb_cols-=1}
      //if(nb_cols>5){nb_cols=5}
      console.log(`clientw:${node.clientWidth} ; nb cols = ${nb_cols}`)
      setNbCols(nb_cols)
    }
    },[size]);


  let thumb_list = []
  if(thumbnails){
    thumb_list = list.map((item)=>({
      src:item,
      thumb:item.replace('.svg','.thumb.png'),
      href:`pz-${item}`,
      name:item.replace('.svg','')
    }))
  }
  return (
    <>
      {thumbnails &&
        <Box ref={boxRef} sx={{backgroundColor:"#e1eaf2",minWidth:(thumb_width+16)*2+16 }} p={1}>
        <ImageList variant="masonry" cols={nbcols} gap={4} sx={{ minWidth:(thumb_width+16)*2 }}>
            {thumb_list.map((item,index) => (
                <ImageListItem key={index} >
                  <PanZoomThumb item={item} thumb_width={thumb_width}/>
                </ImageListItem>
          ))}
        </ImageList>
      </Box>
    }
      {slides &&
        list.map((file,index)=>
        <PanZoomSVG key={index} src={file}/>
      )}
    </>
  )
}
