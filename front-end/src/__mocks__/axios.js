export default {
  post: jest.fn().mockResolvedValue({ data: { message: '' }, status: '' }),
  get: jest.fn().mockResolvedValue({ data: [], status: '' }),
};
