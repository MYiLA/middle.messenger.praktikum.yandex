declare module '*.hbs' {
  const template: (param?:any) => string;
  export default template;
}

declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.vebp';
