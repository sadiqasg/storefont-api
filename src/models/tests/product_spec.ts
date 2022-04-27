import { ProductStore } from '../product';

const store = new ProductStore();

describe('Products', () => {
  it('expects products model should have an index method', () => {
    expect(store.index).toBeTruthy();
  });
  it('expects products model should have a create method', () => {
    expect(store.create).not.toBeUndefined();
  });
  it('expects show method to be defined  ', () => {
    expect(store.show).toBeDefined();
  });
});
