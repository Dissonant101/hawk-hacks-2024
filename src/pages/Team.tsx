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
  const [viewTeam, changeTeamStatus] = useState<boolean>(false);
  const [viewInvites, changeInvitesStatus] = useState<boolean>(false);

  // const [invites, setInvites] = useState<string[]>([]);
  const auth = useContext(SessionContext) as any;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios.get('http://localhost:5000').then((res) => setMessages(res.data));
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const post_message = {
  //       recipientId: auth.user.userId,
  //     };
  //     axios
  //       .post('http://localhost:5000', post_message)
  //       .then((res) => setInvites(res.data));
  //   }, 5000);
  // });

  return (
    <AuthRedirect>
      <Layout>
        <div className="size-full">
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Content>
                  <div className="flex justify-between w-full text-pink-600">
                    <button
                      onClick={() => {
                        changeTeamStatus(!viewTeam);
                        changeInvitesStatus(false);
                      }}
                    >
                      Team Management
                    </button>
                    <button
                      onClick={() => {
                        changeTeamStatus(false);
                        changeInvitesStatus(!viewInvites);
                      }}
                    >
                      See Invites
                    </button>
                  </div>
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
