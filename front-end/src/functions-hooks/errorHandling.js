const status = {
  200: () => false,
  201: () => false,
};

function errorHandling(request) {
  let error = true;
  if (status[request.statusCode]) {
    error = status[request.statusCode]();
  }
  return { ...request, error };
}

export default errorHandling;
