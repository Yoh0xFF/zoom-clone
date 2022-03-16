import React, { useState } from 'react';

import ConversationNotChosen from './ConversationNotChosen';
import './DirectChat.css';
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import NewMessage from './NewMessage';

import { useAppSelector } from '@app/store/hooks';
import {
  selectActiveConversation,
  selectDirectChatHistory,
} from '@app/store/slices/chat-slice-selectors';
import { MessageType } from '@app/types/message';

export default function DirectChat(): JSX.Element {
  const activeConversation = useAppSelector(selectActiveConversation);
  const directChatHistory = useAppSelector(selectDirectChatHistory);

  const [messages, setMessages] = useState<Array<MessageType>>([]);

  return (
    <div className='direct_chat_container'>
      <DirectChatHeader activeConversation={activeConversation} />
      <MessagesContainer messages={messages} />
      <NewMessage
        activeConversation={activeConversation}
        identity={activeConversation?.identity}
      />
      {!activeConversation && <ConversationNotChosen />}
    </div>
  );
}