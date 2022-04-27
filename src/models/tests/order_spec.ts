import { OrderStore } from '../order';

const store = new OrderStore();

describe('Products', () => {
  it('expects products model should have an index method defined', () => {
    expect(store.index).toBeDefined();
  });
  it('expects products model should have a create method', () => {
    expect(store.create).toBeTruthy();
  });
  it('expects method for completed orders to be defined  ', () => {
    expect(store.completed).toBeDefined();
  });
  it('expect method for incomplete (current) orders to be defined  ', () => {
    expect(store.current).toBeDefined();
  });
});
