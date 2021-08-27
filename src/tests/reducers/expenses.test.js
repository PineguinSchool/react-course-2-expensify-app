import expensesRuducer from '../../reducers/expences';
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesRuducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesRuducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesRuducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '4',
      description: '',
      note: '',
      amount: '',
      createdAt: 0
    }
  };
  const state = expensesRuducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
  const amount = 12200;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount
    }
  }
  const state = expensesRuducer(expenses, action);
  expect(state[1].amount).toEqual(amount);
});

test('should not edit expense if expense not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      amount
    }
  };
  const state = expensesRuducer(expenses, action);
  expect(state).toEqual(expenses);
});