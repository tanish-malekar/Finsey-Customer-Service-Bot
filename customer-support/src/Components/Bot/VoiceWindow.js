import React, { useEffect } from 'react';
import { Avatar, Fab, Fade, Grid, Typography } from "@mui/material";
import { VOICE_WINDOW } from "../../constants";
import { useStore } from "../../store";
import ChatHeader from './ChatWindow/ChatHeader';
import Message from './Message';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Button from '../Button'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import transalate from '../../helper/translate';



const VoiceWindow = ({type})=>{
    const [state,] = useStore();
    const [currentSpeaker, setCurrentSpeaker] = useState("bot");
    const [chat, setChat] = useState([]);

    useEffect(() => {
      if(state.botStepper === VOICE_WINDOW)
        type=='general-query'?messageByBot("Hello! I am here to answer any query you have about insurances. Ask away!"):messageByBot("Hello! I am here to help you file the claim...");
    }, [state.botStepper])
    
    
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const speakerAPI = new SpeechSynthesisUtterance();
    const speechHandler = async (msg) => {
      speakerAPI.lang = state.language;
      speakerAPI.text = state.language=='en-US'?msg:(state.language =='hi-IN'?await transalate(msg, 'hi'):await transalate(msg, 'mr'))
      window.speechSynthesis.speak(speakerAPI);
    }

    const messageByBot = (msg) =>{
      let newChat = {
        from: "bot",
        message: msg,
      }
      setChat((prevChat)=>([newChat, ...prevChat]));
      speechHandler(msg);
    }

    const messageByUser = (msg) =>{
      let newChat = {
        from: "user",
        message: msg,
      }
      setChat((prevChat)=>([newChat, ...prevChat]));
    }


    return(
    <Fade in={state.botStepper === VOICE_WINDOW} unmountOnExit>
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
              <Avatar sx={{
                backgroundColor:"primary.dark",
                width:"125px",
                height:"125px",
                margin:"12.5px auto"
              }}>
                <SupportAgentIcon/>
              </Avatar>
              <Typography variant="h6" textAlign="center">Customer Care Associate</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button size='small' status='danger'> Disconnect Call </Button>
            </Grid>
            <Grid item container xs={12} height="60px" borderTop="1px solid gray">
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
              <Typography variant='body1'>{transcript}</Typography>
              <Fab
                color="primary"
                aria-label="add"
              >
                <KeyboardVoiceIcon />
              </Fab>
              {currentSpeaker=="bot"?<Typography variant='subtitle1'>Please wait</Typography>:<Typography variant='subtitle1'>Speak now</Typography>}
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
          {chat.map((chat, index) => (
            <Message {...chat} key={index} />
          ))}
        </Grid>
      </Grid>
        </Grid>
    </Fade>
    )
}

export default VoiceWindow;