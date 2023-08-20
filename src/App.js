import Expenses from "./Components/Expenses/Expenses";
import expensesStore from "./Store/ExpensesStore";
import NewExpense from "./Components/NewExpense/NewExpense";
const App = () => {
  const store = expensesStore;
  return (
    <div className="App">
      <NewExpense />
      <Expenses store={store} />
    </div>
  );
};

export default App;
