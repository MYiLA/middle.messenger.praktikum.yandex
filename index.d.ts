declare module '*.hbs' {
  export default (param?:any) => string;
}

declare module '*.module.scss' {
  export default Record<string, string>;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.vebp';
