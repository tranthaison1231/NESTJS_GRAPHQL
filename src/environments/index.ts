import accessEnv from './accessEnv';

export const RDS_PORT: number = +accessEnv('RDS_PORT', '5432');

export const RDS_USERNAME: string = accessEnv('RDS_USERNAME');

export const RDS_PASSWORD: string = accessEnv('RDS_PASSWORD');

export const RDS_DB_NAME: string = accessEnv('RDS_DB_NAME');

export const RDS_HOSTNAME: string = accessEnv('RDS_HOSTNAME', 'localhost');
