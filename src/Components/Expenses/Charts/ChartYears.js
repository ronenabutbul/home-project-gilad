import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Column } from "@ant-design/charts";
const ChartYears = ({ items }) => {
  const expenseItems = toJS(items.filteredExpenses);
  const amountByYear = expenseItems.reduce((acc, expenseitem) => {
    const expenseYear = expenseitem.date.getFullYear();
    const idx = acc.findIndex((item) => item?.year === expenseYear);

    if (idx > -1) {
      acc[idx].expense += expenseitem.amount;
      return acc;
    }

    acc.push({ year: expenseYear, expense: expenseitem.amount });
    return acc;
  }, []);
  const sortedByYear = [...amountByYear];
  sortedByYear.sort((a, b) => a.year - b.year);
  const data = sortedByYear;
  const config = {
    data,
    height: 200,
    xField: "year",
    yField: "expense",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Column {...config} />;
};

export default observer(ChartYears);
