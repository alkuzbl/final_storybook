import { InitStateAppType } from '../redux/app-reducer';
// доработать
export const showMessageSuccessfulOperation = (
  appData: InitStateAppType,
  setTask: any,
  message: string,
) => {
  console.log(appData);
  if (appData && !appData.error) {
    setTask(message, { variant: 'success' });
    console.log('true');
  }
};
