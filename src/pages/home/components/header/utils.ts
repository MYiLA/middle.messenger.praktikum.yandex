import { Avatar, Button } from '../../../../components';
import Modal from '../../../../components/modal';
import ActionName from '../../../../services/Store/constant';
import runAction from '../../../../services/Store/runAction';
import getResursePath from '../../../../utils/getResursePath';

const getAvatar = (avatar?: string): Avatar => {
  if (!avatar) {
    return new Avatar({
      attr: {
        classes: ['header__avatar'],
      },
      size: 30,
    });
  }

  return new Avatar({
    attr: {
      classes: ['header__avatar'],
    },
    size: 30,
    image: avatar ? getResursePath(avatar) : undefined,
  });
};

const getModalExitChat = (chatId?: number, chatTitle?: string) => {
  if (!chatTitle || !chatId) {
    return new Modal({
      title: 'Выберите чат пожалуйста',
      body: 'Сначала выберите чат, который хотите удалить',
      bodyType: 'desc',
      Buttons: [],
    });
  }

  const ExitChatButton = new Button({
    label: 'Выйти',
    attr: {
      classes: ['modal-button'],
      type: 'button',
    },
    events: {
      click: () => {
        runAction(ActionName.deleteChat, { chatId });
      },
    },
  });

  return new Modal({
    title: 'Удалить чат',
    body: `Вы уверены, что хотите удалить всю историю сообщений и удалить чат “${chatTitle}”?`,
    bodyType: 'desc',
    Buttons: [ExitChatButton],
  });
};

export { getAvatar, getModalExitChat };
