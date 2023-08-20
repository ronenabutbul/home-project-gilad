import { Layout } from "antd";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import FilterExpensesByYear from "../FilterExpensesByYear/FilterExpensesByYear";
import { observer } from "mobx-react-lite";
const { Content } = Layout;
const Expenses = observer(({ store }) => {
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
