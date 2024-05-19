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
import { useUser } from '../hooks/useUser.tsx';

export const Team = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [viewTeam, changeTeamStatus] = useState<boolean>(false);
  const [viewInvites, changeInvitesStatus] = useState<boolean>(false);

  // const [invites, setInvites] = useState<string[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      axios
        .get('https://us-east-2.aws.neurelo.com/rest/messages', {
          headers: {
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            'Content-Type': 'application/json',
          },
          params: {
            filter: {
              team_id: user.team_id,
            },
          },
        })
        .then((res) => {
          setMessages(res.data.data);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  // useEffect(() => {
  //   if (loading) return;

  //   const interval = setInterval(() => {
  //     axios
  //       .get('https://us-east-2.aws.neurelo.com/rest/invites', {
  //         headers: {
  //           'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then((res) => {
  //         // console.log(res.data);
  //         // setMessages(res.data);
  //       });
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [loading]);

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
                  <>
                    {messages.map((message, i) => (
                      <Message
                        key={i}
                        model={{
                          message: message.content,
                          sentTime: 'just now',
                          sender: 'Joe',
                          direction:
                            message.sender_id === user.id
                              ? 'outgoing'
                              : 'incoming',
                          position: 'first',
                        }}
                      />
                    ))}
                  </>
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
                  axios.post(
                    'https://us-east-2.aws.neurelo.com/rest/messages/__one',
                    {
                      sender_id: user.id,
                      team_id: user.teamId,
                      content: innerHtml,
                    },
                    {
                      headers: {
                        'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
                        'Content-Type': 'application/json',
                      },
                    },
                  );
                }}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </Layout>
    </AuthRedirect>
  );
};
