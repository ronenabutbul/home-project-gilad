import { Layout } from "antd";
import "./Expenses.css";
import { toJS } from "mobx";
import ExpensesList from "./ExpensesList";
import FilterExpensesByYear from "../FilterExpensesByYear/FilterExpensesByYear";
import { observer } from "mobx-react-lite";
import expensesStore from "../../Store/ExpensesStore";
import { useState } from "react";
const { Content } = Layout;
const Expenses = observer(({ store }) => {
  // const [selectedYear, setSelectedYear] = useState("All");
  const selectedYear = expensesStore.expenseYear;
  /* const filteredExpenses = toJS(store.expenses).filter((expense) => {
    if (selectedYear === "All") return true;
    return expense.date.getFullYear() === selectedYear;
  });*/
  return (
    <div>
      <Layout className="expenses">
        <Content>
          <FilterExpensesByYear
            items={toJS(store)}
            //  onSelect={setSelectedYear}
          />
          <ExpensesList items={toJS(store.filteredExpenses)} />
        </Content>
      </Layout>
    </div>
  );
});
export default Expenses;
