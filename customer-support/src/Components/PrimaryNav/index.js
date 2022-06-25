import { Grid } from '@mui/material';
import React from 'react';
import logo from '../../images/logo.png';
import { linkList } from './link-list';
import NavLink from './NavLink';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
const PrimaryNav = ()=>{

    return(
        <Grid 
            container 
            item 
            paddingLeft={6} 
            paddingRight={6} 
            paddingTop={2} 
            paddingBottom={2} 
            sx={
                {
                    backgroundColor:"primary.dark"
                }
            } 
            xs={12}
            alignItems="center"
            justifyContent="space-between"
        >
            <Grid container item alignItems="center" spacing={2} xs={6}>
            <Grid item>
                <img src={logo} height="44px" alt="logo"/>
            </Grid>           
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
            <Grid container item alignItems="center" spacing={2} xs={1} justifyContent="space-around">
                <Grid item>
                    <SearchOutlinedIcon htmlColor='white' fontSize='large'/>
                </Grid>
                <Grid item>
                    <CallOutlinedIcon htmlColor='white' fontSize='large'/>
                </Grid>
            </Grid>
        </Grid>
        )

}

export default PrimaryNav;