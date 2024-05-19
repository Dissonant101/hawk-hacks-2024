import { Layout } from './Layout';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { useContext, useEffect, useState } from 'react';
import { TeamManagement } from '../components/TeamManagement.tsx';
import AuthRedirect from '../components/auth/AuthRedirect';
import { SessionContext } from '../App';
import axios from 'axios';

export const Team = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [viewTeam, changeStatus] = useState<boolean>(false);
  const auth = useContext(SessionContext) as any;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios.get('http://localhost:5000').then((res) => setMessages(res.data));
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  return (
    <AuthRedirect>
      <Layout>
        <div className="size-full">
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Content>
                  <span
                    style={{
                      alignSelf: 'flex-center',
                      color: '#ec1212',
                    }}
                  >
                    {' '}
                    <button
                      onClick={() => {
                        changeStatus(!viewTeam);
                      }}
                      className={'hover:opacity-50'}
                    >
                      Team Management
                    </button>
                  </span>
                </ConversationHeader.Content>
              </ConversationHeader>
              <MessageList>
                {viewTeam ? (
                  <TeamManagement />
                ) : (
                  <div>
                    {messages.map((message) => (
                      <Message
                        model={{
                          message: message,
                          sentTime: 'just now',
                          sender: 'Joe',
                          direction: 'incoming',
                          position: 'first',
                        }}
                      />
                    ))}
                  </div>
                )}
              </MessageList>
              <MessageInput
                attachButton={false}
                placeholder="Type Message"
                onSend={(innerHtml) => {
                  setMessages([...messages, innerHtml]);
                  // const post_message = {
                  //   senderId: auth.user.userId,
                  //   teamId: auth.user.teamId,
                  //   message: innerHtml,
                  // };
                  // axios.post('http://localhost:5000', post_message);
                }}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </Layout>
    </AuthRedirect>
  );
};
