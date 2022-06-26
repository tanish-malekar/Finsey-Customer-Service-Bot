import { useEffect, useState } from "react"
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useStore } from "../store";
import { VOICE_WINDOW } from "../constants";
import { toggleShowBot } from "../reducer/BotStepperReducer";

const useVoice = ()=>{
    const [currentSpeaker, setCurrentSpeaker] = useState("bot");
    const [state,dispatch] = useStore();
    const [messages, setMessages] = useState([]);
    
    const {
        transcript,
        listening,
        resetTranscript
    } = useSpeechRecognition();

    useEffect(() => {
        if(state.botStepper === VOICE_WINDOW && state.mode!=="claims")
          messageByBot("Hello! I am here to answer any query you have about insurances. Ask away!")
    }, [state.botStepper])


    useEffect(()=>{
        console.log(listening,transcript);
        if(listening===false && transcript!=="" && state.mode!=="claims")
            if(transcript.toLowerCase()==="no")
                dispatch(toggleShowBot());
            else
                sendQuery(transcript);
      },[listening])

    const speakerAPI = new SpeechSynthesisUtterance();
    const speechHandler = async (msg) => {
        speakerAPI.lang = "en-US";
        speakerAPI.text = msg;
        window.speechSynthesis.speak(speakerAPI);
        speakerAPI.onend =   ()=>{
            SpeechRecognition.startListening('en-IN')
            setCurrentSpeaker('user');
        }
    }

    const messageByBot = (msg) =>{
        SpeechRecognition.stopListening();
        let newChat = {
          from: "bot",
          message: msg,
        }
        setMessages((prevChat)=>([ ...prevChat, newChat]));
        speechHandler(msg);

      }
  
      const sendQuery = (msg) =>{
        let newChat = {
          from: "user",
          message: msg,
        }
        setMessages((prevChat)=>([ ...prevChat, newChat]));
        axios.post('http://127.0.0.1:8000/api/test',{
            message:msg
        },  {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          })
        .then(response=>{
            resetTranscript();
            console.log(response);
            if(response.data.success){
                messageByBot(response.data.data);
                messageByBot("Is there anything else I can help you with?");}
            else
                messageByBot("Please repeat your question.")
        })
      }

    return([messages,transcript,currentSpeaker])
}

export default useVoice;