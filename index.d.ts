declare module '*.hbs' {
  const template: (param?:any) => string
  export default template
}
