import ExpenseForm from "./ExpenseForm";
import expensesStore from "../../Store/ExpensesStore";
import { observer } from "mobx-react-lite";
const NewExpense = () => {
  const showHideForm = expensesStore.showAddExpenseForm;
  return (
    <div className="new-expense">
      {!showHideForm && (
        <button onClick={expensesStore.handleAddExpenseClick}>
          Add New Expense
        </button>
      )}
      {showHideForm && <ExpenseForm />}
    </div>
  );
};
export default observer(NewExpense);
