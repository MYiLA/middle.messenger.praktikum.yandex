declare module '*.hbs' {
  const template: (param?:any) => string
  export default template
}

declare module '*.module.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.svg' {
  const svg: string
  export default svg
}
