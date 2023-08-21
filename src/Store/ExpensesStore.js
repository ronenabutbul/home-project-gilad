import {
  action,
  makeObservable,
  observable,
  runInAction,
  configure,
} from "mobx";

configure({
  enforceActions: "never",
});
class ExpensesStore {
  expenses = [];
  showAddNewExpenseForm = false;
  expenseYear = "All";
  showChart = false;
  filteredExpenses = [];
  editingExpense = undefined;
  isEditModalOpen = false;

  constructor() {
    makeObservable(this, {
      expenses: observable,
      filteredExpenses: observable,
      isEditModalOpen: observable,
      showAddNewExpenseForm: observable,
      editingExpense: observable,
      showChart: observable,
      addExpense: action,
      updateExpense: action,
      removeExpense: action,
    });
    runInAction(this.prefetchData);
  }

  addExpense(expense) {
    const NewExpense = { ...expense, id: Math.floor(Math.random() * 999999) };
    this.expenses.unshift(NewExpense);
    this.handleSelectedYearFilter(this.expenseYear);
  }

  removeExpense(expenseId) {
    const expenseIdx = this.expenses.findIndex((expense) => {
      return expense.id === expenseId;
    });

    if (expenseIdx > -1) this.expenses.splice(expenseIdx, 1);
    this.handleSelectedYearFilter(this.expenseYear);
  }

  updateExpense(updatedExpense) {
    const expenseIdx = this.expenses.findIndex((expense) => {
      return expense.id === updatedExpense.id;
    });

    if (expenseIdx > -1) this.expenses[expenseIdx] = updatedExpense;
    this.isEditModalOpen = false;
    this.handleSelectedYearFilter(this.expenseYear);
  }

  handleUpdateExpense = (id) => {
    if (!id) {
      this.isEditModalOpen = false;
      this.editingExpense = undefined;
      return;
    }
    this.editingExpense = this.expenses.find((expense) => {
      return expense.id === id;
    });
    this.isEditModalOpen = true;
  };
  handleSelectedYearFilter = (year) => {
    this.expenseYear = year;
    this.filteredExpenses = this.expenses.filter((expense) => {
      if (this.expenseYear === "All") {
        this.showChart = false;
        return true;
      }
      this.showChart = true;
      return expense.date.getFullYear() === this.expenseYear;
    });
  };

  handleAddExpenseClick = () => {
    this.showAddNewExpenseForm = true;
  };
  handleCancelClick = () => {
    this.showAddNewExpenseForm = false;
  };

  prefetchData = () => {
    const expenses = [
      {
        title: "Toilet Paper",
        amount: 94.12,
        date: new Date(2020, 7, 14),
      },
      {
        title: "New TV",
        amount: 799.49,
        date: new Date(2021, 2, 12),
      },
      {
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
      {
        title: "New Desk (Wooden)",
        amount: 450,
        date: new Date(2021, 5, 12),
      },
    ];
    expenses.map((expense) => {
      this.addExpense(expense);
      return expense;
    });
  };
}

const expensesStore = new ExpensesStore(); // Create an instance of your store

export default expensesStore;
