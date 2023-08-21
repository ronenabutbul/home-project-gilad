import { toJS } from "mobx";
import React from "react";
import { observer } from "mobx-react-lite";
import { Column } from "@ant-design/charts";
const Carts = ({ items }) => {
  const expenseItems = toJS(items.filteredExpenses);
  const data = [
    { month: "Jan", expense: 0 },
    { month: "Feb", expense: 0 },
    { month: "Mar", expense: 0 },
    { month: "Apr", expense: 0 },
    { month: "May", expense: 0 },
    { month: "Jun", expense: 0 },
    { month: "Jul", expense: 0 },
    { month: "Aug", expense: 0 },
    { month: "Sep", expense: 0 },
    { month: "Oct", expense: 0 },
    { month: "Nov", expense: 0 },
    { month: "Dec", expense: 0 },
  ];
  for (const expense of expenseItems) {
    const expenseMonth = expense.date.getMonth();
    data[expenseMonth].expense += expense.amount;
  }
  console.log(data);
  const config = {
    data,
    height: 200,
    xField: "month",
    yField: "expense",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Column {...config} />;
};
export default observer(Carts);
