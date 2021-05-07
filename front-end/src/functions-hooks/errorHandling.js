const status = {
  200: () => false,
  201: () => false,
  400: () => true,
};

function errorHandling(request) {
  const error = status[request.statusCode]();
  return { ...request, error };
}

export default errorHandling;
