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
  itemDeleted = false;

  constructor() {
    makeObservable(this, {
      expenses: observable,
      filteredExpenses: observable,
      isEditModalOpen: observable,
      showAddNewExpenseForm: observable,
      editingExpense: observable,
      showChart: observable,
      itemDeleted: observable,
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
    return (this.itemDeleted = true);
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
    // Function to generate a random title
    function randomTitle() {
      const titles = [
        "Toilet Paper",
        "New TV",
        "Car Insurance",
        "New Desk (Wooden)",
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    }

    // Function to generate a random decimal number between min and max (inclusive) with one decimal place
    function randomDecimal(min, max) {
      const randomValue = Math.random() * (max - min + 1) + min;
      return parseFloat(randomValue.toFixed(1));
    }

    // Function to generate a random date within a range
    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }

    // Create an array of 100 items with random titles, amounts, and dates
    const expenses = [];

    for (let i = 0; i < 100; i++) {
      const newItem = {
        title: randomTitle(),
        amount: randomDecimal(10, 2000), // Random amount between 10 and 2000 with one decimal place
        date: randomDate(new Date(2019, 0, 1), new Date()), // Random date since 2019
      };

      expenses.push(newItem);
    }
    expenses.map((expense) => {
      this.addExpense(expense);
      return expense;
    });
  };
}

const expensesStore = new ExpensesStore(); // Create an instance of your store

export default expensesStore;
