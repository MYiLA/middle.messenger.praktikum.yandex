/** Информация о пользователе, которая приходит с бэка */
export type UserResponse = {
  /** id */
  id: number;
  /** Имя */
  first_name: string;
  /** Фамилия */
  second_name: string;
  /** Никнейм */
  display_name: string;
  /** Уникальный логин */
  login: string;
  /** Почта */
  email: string;
  /** Телефон */
  phone: string;
  /** Аватар */
  avatar: string;
};

export type RegistrationRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type AuthorizationRequest = {
  login: string;
  password: string;
};

export type AuthorizationResponse = {
  id: number;
};

export type CreateChatRequest = {
  /** Название чата */
  title: string;
};

export type UsersRequest = {
  users: number[];
  chatId: number;
};

export type Message = {
  user: UserResponse;
  time: string;
  content: string;
};

export type ChatsResponse = {
  id: number;
  title: string;
  avatar: string;
  /** Количество непрочитанных сообщений в чате для текущего пользователя */
  unread_count: number;
  last_message: Message;
};

export type ChatDeleteRequest = {
  chatId: number;
};

export type ChatDeleteResponse = {
  userId: number;
  result: ChatsResponse;
};

export type ChatsMessagesTokenResponse = {
  token: string;
};

export type UnreadCountResponse = {
  unread_count: number;
};

export type UserUpdateRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UserRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type FindUserRequest = {
  login: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type Resource = {
  id: number;
  user_id: number;
  /** Относительный путь к файлу */
  path: string;
  /** Имя файла */
  filename: string;
  /** Тип содержимого файла (например, "image/jpeg" для изображений в формате .jpg) */
  content_type: string;
  /** Размер файла в байтах */
  content_size: number;
  upload_date: string;
};

type TypeChatMessage = 'message' | 'file';

export type ChatMessage = {
  id: number;
  user_id: number;
  chat_id: number;
  /** Время отправки сообщения */
  time: string;
  type: TypeChatMessage;
  /** Содержимое сообщения (текст сообщения для сообщений и идентификатор ресурса для файлов) */
  content: string;
  file: Resource;
};

type UserRole = 'admin' | 'regular';

export type ChatUserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
};
