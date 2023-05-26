const cropString = (string: string, symbolLimit: number) => (
  (string.length > symbolLimit) ? `${string.substring(0, symbolLimit)}...` : string
);

export default cropString;
