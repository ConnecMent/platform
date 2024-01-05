import config from 'config';

export const apiPort = config.get<number>('api.port');
export const apiHost = config.get<string>('api.host');
