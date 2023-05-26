import {
  ChangePasswordForm, LoginFormData, SigninProps, SomeObject,
} from '../../common/types';
import { RegistrationFormData } from '../../pages/registration/type';
import ActionName from './constant';
import { Actions } from '.';
import { ChatDeleteRequest, CreateChatRequest, UserRequest } from '../Api/type';

const runAction = (name: ActionName, props: SomeObject = {}) => {
  switch (name) {
    case ActionName.registration:
      return Actions.registration(props as RegistrationFormData);
    case ActionName.signin:
      return Actions.authorization(props as SigninProps);
    case ActionName.getProfile:
      return Actions.getProfile();
    case ActionName.logout:
      return Actions.logout();
    case ActionName.setProfileData:
      return Actions.setProfileData(props as UserRequest);
    case ActionName.setProfileAvatar:
      return Actions.setProfileAvatar(props);
    case ActionName.setProfilePassword:
      return Actions.setProfilePassword(props as ChangePasswordForm);
    case ActionName.getUser:
      return Actions.getUser(props);
    case ActionName.getChats:
      return Actions.getChats();
    case ActionName.createChat:
      return Actions.createChat(props as CreateChatRequest);
    case ActionName.deleteChat:
      return Actions.deleteChat(props as ChatDeleteRequest);
    case ActionName.getChatUsers:
      return Actions.getChatUsers(props);
    case ActionName.getMessageCount:
      return Actions.getMessageCount(props);
    case ActionName.addUserToChat:
      return Actions.addUserToChat(props as LoginFormData);
    case ActionName.deleteUserFromChat:
      return Actions.deleteUserFromChat(props as LoginFormData);
    case ActionName.sendMessage:
      return Actions.sendMessage(props);
    case ActionName.log:
      return Actions.log(props);
    case ActionName.connectToChat:
      return Actions.connectToChat(props as { id: number });
    default:
      throw new Error('Не найден подходящий экшн');
  }
};

export default runAction;
