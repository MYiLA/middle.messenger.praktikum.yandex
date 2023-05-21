import { SigninProps, RegistrationProps } from '../../../common/types';
import Requester from '../../../utils/Requester';
import BaseAPI from '../BaseApi';

const authAPIInstance = new Requester('auth');

class AuthApi extends BaseAPI {
  /** Регистрация */
  registration(props: RegistrationProps): Promise<unknown> {
    console.log('registration');
    return authAPIInstance.post('signup', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Авторизация */
  authorization(props: SigninProps): Promise<unknown> {
    console.log('авторизация');
    return authAPIInstance.post('signin', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Получение подробной информации по текущему пользователю */
  getCurrentUser(): Promise<unknown> {
    return authAPIInstance.get('user').then(this.parseServerResponse);
  }

  /** Выход пользователя из системы */
  logout(): Promise<unknown> {
    return authAPIInstance.post('logout').then(this.parseServerResponse);
  }
}

export default AuthApi;
