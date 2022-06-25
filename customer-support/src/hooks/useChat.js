import { useState } from "react"
import axios from "axios";

const useChat = ()=>{
    const [messages, setMessages] = useState([]);

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
        axios.post('/api/test',{
            message:message
        })
        .then(response=>{
            setMessages(messages=>{
                return(
                    [
                        ...messages,
                        {
                            from:"bot",
                            message:response.data.message 
                        }
                    ]
                )
            })
        })
    }

    return({messages,sendQuery})
}

export default useChat;