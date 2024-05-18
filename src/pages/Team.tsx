import { Layout } from './Layout';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

export const Team = () => {
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <Layout>
      <div className='size-full'>
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content>
                <span
                  style={{
                    alignSelf: 'flex-center',
                    color: '#ec1212'
                  }}
                >
                  Manage your team
                </span>
              </ConversationHeader.Content>
            </ConversationHeader>
            <MessageList>
                {messages.map(message => 
                <Message model={{
                  message: message,
                  sentTime: "just now",
                  sender: "Joe",
                  direction: 'incoming',
                  position: 'first'
                  }} />
                  )}
              </MessageList>
            <MessageInput attachButton={false} placeholder='Type Message' onSend={(innerHtml)=>setMessages([...messages, innerHtml])}/>   
          </ChatContainer>
        </MainContainer>
      </div>
    </Layout>
  )
}
