import React from "react";
import BotContainer from "./BotContainer";
import ChatWindow from "./ChatWindow";
import GetDetails from "./GetDetails";
import GetStarted from "./GetStarted";
import VoiceWindow from "./VoiceWindow";


const Bot = ({ showBot }) => {
  return (
    <BotContainer showBot={showBot}>
        <GetStarted />
        <GetDetails />
        {/* <ChatWindow /> */}
        <VoiceWindow/>
    </BotContainer>
  );
};

export default Bot;
