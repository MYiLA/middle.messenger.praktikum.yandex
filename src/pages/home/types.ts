import { ChatsResponse, Message, UserInfo } from '../../common/types';

export type HomeProps = {
  chats: ChatsResponse[],
  profile: UserInfo,
  currentChat: ChatsResponse,
  withId: boolean,
};

export type HeaderProps = {
  attr?: {
    classes?: string[],
  },
  currentChat: ChatsResponse
};

export type BodyProps = {
  messages?: Message[],
  currentUserId?: number,
  attr?: {
    classes?: string[],
  }
};

export type FooterProps = {
  attr?: {
    classes?: string[],
  }
};

export type ChatProps = {
  attr?: {
    classes?: string[],
  },
  currentChatId: number,
  profileId: number,
  token: string,
};

export type ChatBrickProps = {
  attr?: {
    classes?: string[],
  }
  avatarColor?: string,
  title: string,
  lastMessageContent?: string,
  lastMessageTime?: string,
  unread_count?: number,
  avatar?: string,
  events?: {
    click?: (ev: Event) => void,
  }
};

export type ChatStubProps = {
  attr?: {
    classes?: string[],
  }
};

export type MessageItemProps = {
  time: string,
  text?: string,
  image?: string,
  events?: {
    click?: (ev: Event) => void,
  }
  isViewed?: boolean,
  isMy?: boolean,
  attr?: {
    classes?: string[],
  }
};
