const consoleLogError = (error: unknown) => {
  let errorMessage = "Something happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
};

export default consoleLogError;
