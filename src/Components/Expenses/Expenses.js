import { Layout } from "antd";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import Carts from "./Charts/Charts";
import FilterExpensesByYear from "../FilterExpensesByYear/FilterExpensesByYear";
import { observer } from "mobx-react-lite";
import ChartYears from "./Charts/ChartYears";
const { Content } = Layout;
const Expenses = observer(({ store }) => {
  return (
    <div>
      <Layout className="expenses">
        <Content>
          {store.showChart && <Carts items={store} />}
          {!store.showChart && <ChartYears items={store} />}
          <FilterExpensesByYear items={store} />
          <ExpensesList items={store} />
        </Content>
      </Layout>
    </div>
  );
});
export default Expenses;
