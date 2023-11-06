const argsAreNumbers = (args: string[]): number[] => {
  return args.map((arg) => {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error("Non-numeric argument encountered");
    }
    return num;
  });
};

export default argsAreNumbers;
