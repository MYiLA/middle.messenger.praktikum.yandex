import Store from './Store';

const store = new Store();

const getFormState = () => {
  const state = store.getState();
  const form = state.form ?? {};

  return {
    text: '',
    lines: [],
    times: [],
    ...form,
  };
};

const getCustomState = () => {
  const state = store.getState();
  const custom = state.custom ?? {};

  return {
    data: [],
    times: [],
    ...custom,
  };
};

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};

  return {
    data: [],
    times: [],
    ...user,
  };
};

const explodeText = (text: string): string[] => text.split('\n').map((i) => i.trim());

const setText = (newText: string) => {
  const form = getFormState();
  const lines = explodeText(newText);
  const times = (Array(lines.length)).fill((new Date()).toString());

  store.set('form', {
    ...form,
    text: lines.join('\n'),
    lines,
    times,
  });
};

const addText = (add: string) => {
  const form = getFormState();
  const lines = explodeText(add);
  const times = (Array(lines.length)).fill((new Date()).toString());

  form.lines = form.lines.concat(lines);
  form.times = form.times.concat(times);
  form.text = form.lines.join('\n');

  store.set('form', form);
};

const addCustomData = (add: string) => {
  const custom = getCustomState();
  custom.data.push(add);
  custom.times.push((new Date()).toString());

  store.set('custom', custom);
};

const addUserData = (add: string) => {
  const user = getUserState();
  user.data.push(add);
  user.times.push((new Date()).toString());

  store.set('user', user);
};

window.spaceChatStoreAction = addUserData;

export {
  setText, addText, addCustomData, addUserData,
};
