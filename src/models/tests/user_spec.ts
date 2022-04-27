import { UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index should return an array which should list the users', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
