import { Grid, Typography } from '@mui/material';
import React from 'react'

const NavLink = ({label, link})=>{
    return(
        <Grid item>
            <a href={link} style={{textDecoration:'none', color:"primary.main"}}>
                <Typography>
                    {label}
                </Typography>
            </a>
        </Grid>
        )
}

export default NavLink;