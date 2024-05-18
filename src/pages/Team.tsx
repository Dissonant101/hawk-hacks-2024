// import { TextField } from '@mui/material';
import { Layout } from './Layout';

// export const Team = () => {
//   return (
//     <Layout>
//       <div>
//         <div className="size-full bg-white">
//           <div></div>
//         </div>
//         <div className='bg-white flex flex-col justify-between'>
//           <TextField id="message-box" multiline variant="outlined" rows={3} fullWidth color='success'/>
//         </div>
//       </div>
//     </Layout>
//   )
// };

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

export const Team = () => {
  const [messages, setMessages] = useState<string[]>(["message1", "message2"])
  return (
    <Layout>
      <div className='size-full'>
        <MainContainer>
          <ChatContainer>       
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
            <MessageInput placeholder="Type message here"/>        
          </ChatContainer>
        </MainContainer>
      </div>
    </Layout>
  )
}
