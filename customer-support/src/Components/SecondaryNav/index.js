import { Grid } from '@mui/material';
import React from 'react'
import { linkList } from './link-list';
import NavLink from './NavLink';
const SecondaryNav = ()=>{

    return(
        <Grid 
        container 
        item 
        paddingLeft={6} 
        paddingTop={1} 
        paddingBottom={1} 
        columnSpacing={2} 
        xs={12}>
            {
                linkList.map((link,index)=>(
                    <NavLink
                        label={link.label}
                        link={link.url}
                        key={index}
                    />
                ))
            }
        </Grid>
        )

}

export default SecondaryNav;