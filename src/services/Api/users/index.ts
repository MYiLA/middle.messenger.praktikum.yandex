import { SetProfileDataProps } from '../../../common/types';
import Requester from '../../../utils/Requester';
import BaseAPI from '../BaseApi';

const userAPIInstance = new Requester('user');

class UserApi extends BaseAPI {
  /** Изменить данные текущего пользователя */
  setProfileData(props: SetProfileDataProps): Promise<unknown> {
    console.log('setProfileData', props);
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
    console.log('setProfileAvatar', file);
    const formData = new FormData();
    formData.append('avatar', file);
    return userAPIInstance.put('profile/avatar', {
      headers: {
        'content-type': 'multipart/form-data',
        accept: 'application/json',
      },
      body: formData,
    }).then(this.parseServerResponse);
  }

  /** Изменить пароль текущего пользователя */
  setProfilePassword(props: {
    oldPassword: string,
    newPassword: string
  }): Promise<unknown> {
    console.log('setProfilePassword', props);
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
    console.log('getUser', id);
    return userAPIInstance.get(id).then(this.parseServerResponse);
  }
}

export default UserApi;
