import React from "react";
import ChatHeader from './ChatWindow/ChatHeader';
import { Fab, Avatar, Grid, Typography } from "@mui/material";
import { useStore } from "../../store";
import Dialog from '@mui/material/Dialog';
import Message from './Message';
import Button from '../Button'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const GetStarted = (props) => {
  const [state, dispatch] = useStore();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  

  return (
    // <Fade in={state.botStepper === GET_STARTED} unmountOnExit>
    <Dialog fullScreen={true } fullWidth= { true } maxWidth= { true }  onClose={handleClose} open={state.botStepper === VIDEO_WINDOW && state.mode}>
      <Grid container>
        <ChatHeader />
        <Grid container xs={12}>
            <Grid
            container
            item
            xs={8}
            height="100%"
            paddingTop="85px"
            >
                <Grid item xs = {12}>
                  <video width = "880px" height ="458.67px" controls></video>   
                </Grid>
                <Grid item 
                xs={3}
                width = "180px"
                height = "50px"
                margin="auto"
                >
              <Button size='small' status='danger'> Disconnect Call </Button>
            </Grid>
            <Grid item container xs={12} height="100px" borderTop="1px solid gray">
              <Grid item xs={12} textAlign="center">
              <Typography 
              variant='body1' 
              textAlign="left" 
              height="30px"></Typography>
            <Fab
                color="primary"
                aria-label="add"
                margin="auto"
              >
                <KeyboardVoiceIcon />
              </Fab>
              <Typography variant='subtitle1'>Please wait</Typography>:<Typography variant='subtitle1'>Speak now</Typography>}
            </Grid>
            </Grid>
            </Grid>
            <Grid
          container
          item
          height="70px"
          paddingTop="25px"
          paddingBottom="25px"
          overflow="auto"
          alignItems="self-start"
          display="block"
          xs={8}
          borderLeft="6px solid gray"
        >
          
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
    // </Fade>
  );
};

export default GetStarted;
