import { useState } from "react"
import axios from "axios";

const useChat = ()=>{
    const [messages, setMessages] = useState([{
        from:"bot",
        message:"Hey, how can I help you today?"
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
        .then(response=>{
            console.log(response);
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