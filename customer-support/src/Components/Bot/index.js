import React from "react";
import BotContainer from "./BotContainer";
import ChatWindow from "./ChatWindow";
import GetDetails from "./GetDetails";
import GetStarted from "./GetStarted";

const Bot = ({ showBot }) => {
  return (
    <BotContainer showBot={showBot}>
        <GetStarted />
        <GetDetails />
        <ChatWindow />
    </BotContainer>
  );
};

export default Bot;
