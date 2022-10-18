import Bunzz, {Handler} from 'bunzz-sdk';

export const initialize = async (): Promise<Handler> => {
  return await Bunzz.initWithConnect({
    dappId: process.env.DAPP_ID || 'f247bb20-2144-4266-bbf3-cba699d948e2',
    apiKey: process.env.API_KEY || '9ecf9395-7baa-4f19-8d6c-a6ddedb3336b',
  });
};
