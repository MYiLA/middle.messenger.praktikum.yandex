import { SetProfileDataProps } from '../../../common/types';
import Requester from '../../../utils/Requester';
import BaseAPI from '../BaseApi';

const userAPIInstance = new Requester('user');

class UserApi extends BaseAPI {
  /** Изменить данные текущего пользователя */
  setProfileData(props: SetProfileDataProps): Promise<unknown> {
    return userAPIInstance.put('profile', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Изменить аватар текущего пользователя */
  setProfileAvatar(file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append('avatar', file);
    return userAPIInstance.put('profile/avatar', {
      body: formData,
    }).then(this.parseServerResponse);
  }

  /** Изменить пароль текущего пользователя */
  setProfilePassword(props: {
    oldPassword: string,
    newPassword: string
  }): Promise<unknown> {
    return userAPIInstance.put('password', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  }

  /** Получение информации о пользователе по id */
  getUser(id: string): Promise<unknown> {
    return userAPIInstance.get(id).then(this.parseServerResponse);
  }

  /** Получение информации о пользователе по логину */
  findUserByLogin(props: { login: string }): Promise<unknown> {
    return userAPIInstance.post('search', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  }
}

export default UserApi;
