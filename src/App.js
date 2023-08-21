import Expenses from "./Components/Expenses/Expenses";
import expensesStore from "./Store/ExpensesStore";
import NewExpense from "./Components/NewExpense/NewExpense";
import { App as Theme } from "antd";
const App = () => {
  const store = expensesStore;
  return (
    <Theme>
      <div className="App">
        <NewExpense store={store} />
        <Expenses store={store} />
      </div>
    </Theme>
  );
};

export default App;
