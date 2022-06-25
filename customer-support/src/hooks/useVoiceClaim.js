import { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const claimMessages = [
    "Hey! I am here to help you file your claim! Can you please provide me with the date and time of the accident",
    "Thank you, now please provide the address of the accident.", 
    "Okay, can you please tell us the Kilometer reading of your car?", 
    "Please provide us with a video of your damaged car. The video should be a 360 view of the car. Make sure you focus on all the damages."];

const index = {
    0:"dandt",
    1:"address",
    2:"kms",
    3:"video"
} 

const useVoiceClaim = ()=>{
    const speakerAPI = new SpeechSynthesisUtterance();
    
    const [form,setForm] = useState({
        dandt:"",
        address:"",
        kms:"",
        video:null
    });
    const [stepper,setStepper] = useState(0);
    const [state,dispatch] = useStore();
    const [messages, setMessages] = useState([]);
    const [currentSpeaker, setCurrentSpeaker] = useState("bot");

    const {
        transcript,
        listening,
        resetTranscript
    } = useSpeechRecognition();

    useEffect(() => {
        if(state.botStepper === VOICE_WINDOW)
          messageByBot()
    }, [state.botStepper])

    useEffect(()=>{
        if(stepper===4){
            let formData = new FormData();
            formData.append("dandt",form.dandt)
            formData.append("address",form.address)
            formData.append("message",form.message)
            formData.append("video",form.video)
        }
    },[stepper])


    useEffect(()=>{
        console.log(listening,transcript);
        if(listening===false && transcript!=="")
            if(transcript.toLowerCase()==="no")
                dispatch(toggleShowBot());
            else
                sendQuery(transcript);
      },[listening])



    const messageByBot = () =>{
        SpeechRecognition.stopListening();
        let newChat = {
          from: "bot",
          message: claimMessages[stepper],
        }
        setMessages((prevChat)=>([ ...prevChat, newChat]));
        speechHandler(claimMessages[stepper]);
    }
    
    useEffect(()=>{
        console.log(listening,transcript);
        if(listening===false && transcript!=="")
            if(transcript.toLowerCase()==="cancel")
                dispatch(toggleShowBot());
            else
                sendQuery(transcript);
      },[listening])


    const speechHandler = async (msg) => {
        speakerAPI.lang = "en-US";
        speakerAPI.text = msg;
        window.speechSynthesis.speak(speakerAPI);
        speakerAPI.onend =   ()=>{
            SpeechRecognition.startListening('en-IN')
            setCurrentSpeaker('user');
        }
    }

    const sendQuery = (msg) =>{
        let newChat = {
          from: "user",
          message: msg,
        }
        setMessages((prevChat)=>([ ...prevChat, newChat]));
        let newForm  = {...form}
        newForm[index[stepper]] = msg
        setForm(newForm);
        setStepper(stepper+1);
      }

      return({messages,transcript,currentSpeaker})
    
}

export default useVoiceClaim;