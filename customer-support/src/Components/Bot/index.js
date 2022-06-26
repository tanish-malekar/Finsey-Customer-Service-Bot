import React from "react";
import BotContainer from "./BotContainer";
import ChatWindow from "./ChatWindow";
import GetDetails from "./GetDetails";
import GetStarted from "./GetStarted";
import SelectActivity from "./SelectActivity";
import SelectMode from "./SelectMode";
import VideoWindow from "./VideoWindow";
import VoiceWindow from "./VoiceWindow";


const Bot = () => {
  return (
    <BotContainer>
        <GetStarted />
        <GetDetails />
        <ChatWindow />
        <VoiceWindow type='general-query'/>
        <SelectMode/>
        <SelectActivity/>
        <VideoWindow/>
    </BotContainer>
  );
};

export default Bot;
