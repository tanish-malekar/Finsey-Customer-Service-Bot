import { useState } from "react"
import axios from "axios";
import transalate from "../helper/translate";
import { useStore } from "../store";

const useChat = ()=>{
    const [state] = useStore();

    const [messages, setMessages] = useState([{
        from:"bot",
        message: state.language=='en-US'?"Hey, how can I help you today?":(state.language=='hi-IN'?"आज मैं आपकी मदद कैसे कर सकता हूं?":"आज मी तुझी कशी मदत करू?")
    }]);

    const sendQuery = (message)=>{
        setMessages(messages=>{
            return(
                [
                    ...messages,
                    {
                        from:"user",
                        message:message 
                    }
                ]
            )
        })
        axios.post('http://127.0.0.1:8000/api/test',{
            message:message
        },  {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          })
        .then(async (response)=>{
            response.data.data = state.language=='en-US'?response.data.data:(state.language=='hi-IN'?await transalate(response.data.data, 'hi'):await transalate(response.data.data, 'mr'));
            console.log(response.data.data);
            setMessages(messages=>{
                return(
                    [
                        ...messages,
                        {
                            from:"bot",
                            message:response.data.data
                        }
                    ]
                )
            })
        })
    }

    return({messages,sendQuery})
}

export default useChat;