import PanZoomSVG from '../components/PanZoomSVG'
import {Box, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Button,ListSubheader  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { zoomIn } from 'svg-pan-zoom';

export default function PanZoomList({list,thumbnails=false}) {
  let thumb_list = []
  if(thumbnails){
    thumb_list = list.map((item)=>({
      thumb:item.replace('.svg','.thumb.png'),
      href:`pz-${item}`,
      name:item.replace('.svg','')
    }))
  }
  return (
    <>
      {thumbnails &&
        <Box>
        <ImageList variant="masonry" cols={{xs:3,md:3}} gap={8} sx={{ minWidth:400 }}>
            {thumb_list.map((item,index) => (
            <ImageListItem key={index}>
              <img width="200"
                src={`${item.thumb}?fit=crop&auto=format`}
                srcSet={`${item.thumb}?fit=crop&auto=format&dpr=2 2x`}
                alt={item.href}
                loading="lazy"
                onClick={()=>{console.log("clicked")}}
                sx={{cursor:"zoom-in"}}
              />
              <ImageListItemBar 
                position="below"
                title={item.name}
                actionIcon={
                  <IconButton
                    sx={{ color: 'black' }}
                    aria-label={`star ${item.title}`}
                    href={`#${item.href}`}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    }
      {list.map((file,index)=>
        <PanZoomSVG key={index} src={file}/>
      )}
    </>
  )
}
