import { toJS } from "mobx";
import React from "react";
import { observer } from "mobx-react-lite";
import { Line } from "@ant-design/charts";
const Carts = ({ items }) => {
  const expenseItems = toJS(items.filteredExpenses);
  //const expenseMonth = expenseItems.date.getMonth();
  // console.log(expenseItems.date);
  const data = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "AUG", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ];
  for (const expense of expenseItems) {
    const expenseMonth = expense.date.getMonth();
    data[expenseMonth].value += expense.amount;
    console.log(expenseMonth);
  }
  const config = {
    data,
    height: 200,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Line {...config} />;
};
export default observer(Carts);
