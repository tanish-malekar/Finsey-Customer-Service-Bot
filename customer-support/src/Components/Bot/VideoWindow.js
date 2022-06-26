import React, { useEffect } from 'react';
import { Avatar, Fab, Fade, Grid, Typography } from "@mui/material";
import { VIDEO_WINDOW, VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import ChatHeader from './ChatWindow/ChatHeader';
import Message from './Message';
import Button from '../Button'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import transalate from '../../helper/translate';
import useVideo from '../../hooks/useVideo';



const VideoWindow = ({type})=>{
    const [state,] = useStore();

    const [messages,transcript,video] = useVideo();

    return(
    <Fade in={state.botStepper === VIDEO_WINDOW && state.mode} unmountOnExit>
      <Grid container>
        <ChatHeader />
        <Grid container xs={12}>
          <Grid 
          container 
          item 
          xs={6} 
          height="100%"
          paddingTop="85px"
          >
            <Grid item xs={12}>
              {video && <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src={video} width="100%"/>}
            </Grid>
            <Grid item xs={12}>
              <Button size='small' status='danger'> Disconnect Call </Button>
            </Grid>
            <Grid item container xs={12} height="100px" borderTop="1px solid gray">
              <Grid item xs={12} textAlign="center">
              <Typography variant='body1' textAlign="left" height="30px">{transcript}</Typography>
              <Fab
                color="primary"
                aria-label="add"
                margin="auto"
              >
                <KeyboardVoiceIcon />
              </Fab>
              {"user"==="bot"?<Typography variant='subtitle1'>Please wait</Typography>:<Typography variant='subtitle1'>Speak now</Typography>}
              </Grid>
            </Grid>
          </Grid>
          <Grid
          container
          item
          height="400px"
          paddingTop="85px"
          paddingBottom="65px"
          overflow="auto"
          alignItems="self-start"
          display="block"
          xs={6}
          borderLeft="1px solid gray"
        >
          {messages.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
      </Grid>
        </Grid>
    </Fade>
    )
}

export default VideoWindow;