import "./FilterExpensesByYear.css";
import { Select, Space } from "antd";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
const FilterExpensesByYear = observer(({ items }) => {
  const years = items.expenses.map((item) => new Date(item.date).getFullYear());
  const uniqueYears = Array.from(new Set(years));
  const options = uniqueYears.map((year) => ({
    lable: year.toString(),
    value: year,
  }));
  options.unshift({ lable: "", value: "All" });
  const handleChange = (value) => {
    toJS(items).onSelect(value);
  };
  return (
    <div className="filter_expenses">
      <p>Filter By Year</p>
      <Space wrap>
        {" "}
        <Select
          defaultValue={options[0]}
          style={{ width: 120 }}
          options={options}
          onChange={items.handleSelectedYearFilter}
        />
      </Space>
    </div>
  );
});
export default FilterExpensesByYear;
