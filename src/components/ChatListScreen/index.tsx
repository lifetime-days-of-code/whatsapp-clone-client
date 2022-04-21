import React from "react";
import ChatNavbar from "./ChatNavbar";
import ChatList from "./ChatList";
import styled from "styled-components";

const Container = styled.section`
  height: 100vh;
`;

const ChatListScreen: React.FC = () => (
  <Container>
    <ChatNavbar />
    <ChatList />
  </Container>
)

export default ChatListScreen;