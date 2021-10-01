import { SidebarLayout } from '../layouts/SidebarLayout';
import type { Page } from '../utils/types';
import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { ChatMessage } from '../generated/graphql';

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }: { user: string }) => {
  const { data } = useQuery(GET_MESSAGES);

  if (!data) {
    return null;
  }

  return (
    <div>
      {data.messages.map(({ id, user: messageUser, content }: ChatMessage) => (
        <div
          key={id}
          className="pb-2"
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
          }}
        >
          {user !== messageUser && (
            <div className="flex items-center justify-center w-8 h-8 mr-2 border-2 border-green-600 rounded-full">
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            className={`${
              user === messageUser ? 'bg-blue-600' : 'bg-green-600'
            } py-1 px-2 rounded-lg`}
            style={{ maxWidth: '70%' }}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

const Chat: Page = () => {
  const [state, setState] = React.useState({ user: 'Jack', content: '' });
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    setState({
      ...state,
      content: '',
    });
  };

  return (
    <div className="flex justify-center py-10 mx-10 rounded-lg">
      <div className="flex-none w-full p-10 text-white bg-gray-900 rounded-lg shadow-md">
        <Messages user={state.user} />
        <div className="grid w-full grid-cols-12 mt-10 space-x-5">
          <input
            type="User"
            className="col-span-2 p-1 bg-gray-800 border-2 border-gray-600 rounded"
            value={state.user}
            onChange={(evt) => {
              setState({ ...state, user: evt.target.value });
            }}
          />
          <input
            type="Content"
            className="col-span-8 col-start-3 p-1 bg-gray-800 border-2 border-gray-600 rounded"
            value={state.content}
            onChange={(evt) => {
              setState({ ...state, content: evt.target.value });
            }}
            onKeyUp={(evt) => {
              console.log(evt.key);
              if (evt.key === 'Enter') {
                onSend();
              }
            }}
          />
          <button></button>
        </div>
      </div>
    </div>
  );
};

Chat.Layout = SidebarLayout;

export default Chat;
