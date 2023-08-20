import NewExpenseForm from "./NewExpenseForm";
import { observer } from "mobx-react-lite";
const NewExpense = ({ store }) => {
  const showHideForm = store.showAddNewExpenseForm;
  return (
    <div className="new-expense">
      {!showHideForm && (
        <button onClick={store.handleAddExpenseClick}>Add New Expense</button>
      )}
      {showHideForm && <NewExpenseForm expense={store} />}
    </div>
  );
};
export default observer(NewExpense);
