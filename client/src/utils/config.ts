const NODE_ENV = process.env.NODE_ENV;
export const IS_LOCAL = NODE_ENV === 'development';
export const IS_PROD = !IS_LOCAL;
