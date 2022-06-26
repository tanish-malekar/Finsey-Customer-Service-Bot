import { useState } from "react"
import transalate from "../helper/translate";
import { useStore } from "../store";

const useChatClaim = () =>{
    const [state] = useStore();

    const [messagesClaim, setMessagesClaim] = useState([{
        from:"bot",
        message:"Hey! I am here to help you file your claim! Can you please provide me with the date and time of the accident"
    }]);
    const [questionNo, setQuestionNo] = useState(0);

    const claimMessages = ["Thank you, now please provide the address of the accident.", "Okay, can you please tell us the Kilometer reading of your car?", "Please provide us with a video of your damaged car. The video should be a 360 view of the car. Make sure you focus on all the damages."];

    const messageByBot = () =>{
        if(questionNo<=2){
            setMessagesClaim(async (prevMessages)=>[...prevMessages, 
                {from: "bot", 
                message:state.language=='en-US'?claimMessages[questionNo]:(state.language=='hi-IN'?await transalate(claimMessages[questionNo], 'hi'):await transalate(claimMessages[questionNo], 'mr'))
                }]);
            setQuestionNo((prev)=>(prev+1));
        }
    }

    const messageByUser = (msg) =>{
        console.log("in msgbyuser");
        setMessagesClaim((prevMessages)=>[...prevMessages, {from: "user", message:msg}]);
        messageByBot();
    }



    return ({messagesClaim, messageByBot, messageByUser})
}

export default useChatClaim; 