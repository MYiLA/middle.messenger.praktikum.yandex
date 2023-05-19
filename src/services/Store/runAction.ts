import { SigninProps, SomeObject } from '../../common/types';
import { RegistrationFormData } from '../../pages/registration/type';
import ActionName from './constant';
import { Actions } from '.';

const runAction = (name: ActionName, props: SomeObject = {}) => {
  switch (name) {
    case ActionName.registration:
      return Actions.registration(props as RegistrationFormData);
    case ActionName.signin:
      return Actions.signin(props as SigninProps);
    case ActionName.getProfile:
      return Actions.getProfile(props);
    case ActionName.logout:
      return Actions.logout(props);
    case ActionName.setProfileData:
      return Actions.setProfileData(props);
    case ActionName.setProfileAvatar:
      return Actions.setProfileAvatar(props);
    case ActionName.setProfilePassword:
      return Actions.setProfilePassword(props);
    case ActionName.getUser:
      return Actions.getUser(props);
    case ActionName.getChats:
      return Actions.getChats(props);
    case ActionName.createChat:
      return Actions.createChat(props);
    case ActionName.deleteChat:
      return Actions.deleteChat(props);
    case ActionName.getChatUsers:
      return Actions.getChatUsers(props);
    case ActionName.getMessageCount:
      return Actions.getMessageCount(props);
    case ActionName.addUserInChat:
      return Actions.addUserInChat(props);
    case ActionName.deleteUserFromChat:
      return Actions.deleteUserFromChat(props);
    case ActionName.sendMessage:
      return Actions.sendMessage(props);
    case ActionName.log:
      return Actions.log(props);
    default:
      throw new Error('Не найден подходящий экшн');
  }
};

export default runAction;
