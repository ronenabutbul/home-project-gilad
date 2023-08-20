import ExpenseForm from "./ExpenseForm";
import { observer } from "mobx-react-lite";
const NewExpense = ({ store }) => {
  const showHideForm = store.showAddExpenseForm;
  return (
    <div className="new-expense">
      {!showHideForm && (
        <button onClick={store.handleAddExpenseClick}>Add New Expense</button>
      )}
      {showHideForm && <ExpenseForm expense={store} />}
    </div>
  );
};
export default observer(NewExpense);
