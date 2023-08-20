import { Layout } from "antd";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import Carts from "./Charts/Charts";
import FilterExpensesByYear from "../FilterExpensesByYear/FilterExpensesByYear";
import { observer } from "mobx-react-lite";
const { Content } = Layout;
const Expenses = observer(({ store }) => {
  return (
    <div>
      <Layout className="expenses">
        <Content>
          <Carts items={store} />
          <FilterExpensesByYear items={store} />
          <ExpensesList items={store} />
        </Content>
      </Layout>
    </div>
  );
});
export default Expenses;
