export default {
  get: jest.fn().mockResolvedValue({
    data: {
      id: 1,
      name: 'Test',
      description: 'this is a test',
      ingredients: [{ id: 3, name: 'testing' }],
    },
  }),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};
