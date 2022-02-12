import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link'

const pages = [
    {'name':'home'     ,'href':'tiger'},
    {'name':'svg'     ,'href':'svg'},
    {'name':'boxed'     ,'href':'panzoom/boxed'},
    {'name':'fitted'    ,'href':'panzoom/fitted'},
    {'name':'panzoom'   ,'href':'panzoom/panzoom'},
    {'name':'img'       ,'href':'panzoom/img'},
    {'name':'r_simple','href':'rsvg/simple'},
    {'name':'r_tiger' ,'href':'rsvg/tiger'},
    {'name':'r_auto'  ,'href':'rsvg/auto'}
]


export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                {pages.map((page,index)=>(
                    <Link href={`/${page.href}`} key={index}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {page.name}
                            </Typography>
                        </Button>
                    </Link>          
            ))}
            </Toolbar>
        </AppBar>
    </Box>
  );
}

