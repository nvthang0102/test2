import { notification } from 'antd';

export const notifyCustom = (messageTitle, description, type) => {
  notification[type]({
    message: messageTitle,
    description: description,
  });
};
