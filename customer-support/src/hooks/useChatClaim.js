import { useState } from "react"

const useChatClaim = () =>{
    const [messages, setMessages] = useState([{
        from:"bot",
        message:"Hey! I am here to help you file your claim! Can you please provide me with the date and time of the accident"
    }]);

    const messageByBot = (msg) =>{
        setMessages((prevMessages)=>[...messages, {from: "bot", message:msg}]);
    }

    const messageByUser = (msg) =>{
        setMessages((prevMessages)=>[...messages, {from: "user", message:msg}]);
    }

    return (messages, messageByBot, messageByUser);
}