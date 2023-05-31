import { SomeObject } from '../../common/types';
import { BlockConstructor } from '../Block';
import Store from './Store';

export default function connect(
  Component: BlockConstructor,
  mapStateToProps: (props: SomeObject) => SomeObject,
) {
  // Используем class expression
  return class extends Component {
    constructor(props = {}) {
      const store = new Store();

      // Не забываем передать все аргументы конструктора
      super({ ...props, ...mapStateToProps(store.getState()) });

      // Подписываемся на событие
      store.attach(Store.EVENT_UPDATE, () => {
        // Вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
