import React, { useState, useMemo } from 'react'
import moment from 'moment';
import { List, ListItem } from "@material-ui/core";
import styled from 'styled-components';

const Container = styled.section`
  height: 100%;
  overflow-y: overlay;
`;

const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.h2`
  margin-top: 5px;
  margin-bottom: 0;
`;

const MessageContent = styled.p`
  color: gray;
  font-size: 15px;
  margin-top:5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.p`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

const getChatsQuery = `
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;

const ChatList: React.FC = () => {

  const [chats, setChats] = useState<any[]>([]);

  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getChatsQuery }),
    });
    const { data: { chats } } = await body.json();
    setChats(chats);
    console.log(chats)
  }, []);

  return (
    <Container>
      <StyledList>
        {chats.map(chat => (
          <StyledListItem key={chat.id} button>
            <ChatPicture src={chat.picture} alt="Profile" />
            <ChatInfo>
              <ChatName>{chat.name}</ChatName>
              {chat.lastMessage && (
                <>
                  <MessageContent>{chat.lastMessage?.content}</MessageContent>
                  <MessageDate>{moment(chat.lastMessage.createdAt).format('HH:mm')}</MessageDate>
                </>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  )
}


export default ChatList;