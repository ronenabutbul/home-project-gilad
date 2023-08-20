import { Layout } from "antd";
import "./Expenses.css";
import { toJS } from "mobx";
import ExpensesList from "./ExpensesList";
import FilterExpensesByYear from "../FilterExpensesByYear/FilterExpensesByYear";
import { observer } from "mobx-react-lite";
const { Content } = Layout;
const Expenses = observer(({ store }) => {
  const selectedYear = store.expenseYear;
  return (
    <div>
      <Layout className="expenses">
        <Content>
          <FilterExpensesByYear items={store} />
          <ExpensesList items={store} />
        </Content>
      </Layout>
    </div>
  );
});
export default Expenses;
