import { Space, Table, Button, Popconfirm, App, Pagination } from "antd";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import EditExpense from "../EditExpense/EditExpense";
import "./ExpensesList.css";
const ExpensesList = observer(({ items }) => {
  const unorderedExpensesList = toJS(items.filteredExpenses);
  const expenseItems = [...unorderedExpensesList];
  expenseItems.sort((a, b) => a.date - b.date);
  const { message } = App.useApp();

  const handelRemove = (id) => {
    items.removeExpense(id);

    if (items.itemDeleted) {
      message.success("Expense Removed Successfuly");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Edit expense",
      dataIndex: "id",
      key: "edit",
      render: (id) => (
        <Space size="middle">
          <Button
            onClick={() => {
              items.handleUpdateExpense(id);
            }}
          >
            Edit Expense
          </Button>
        </Space>
      ),
    },
    {
      title: "Remove",
      dataIndex: "id",
      key: "remove",
      render: (id) => (
        <Popconfirm
          title="Sure you want delete?"
          onConfirm={() => handelRemove(id)}
        >
          <Space size="middle">
            <Button>Remove Expense</Button>
          </Space>
        </Popconfirm>
      ),
    },
  ];
  if (expenseItems.length === 0) {
    return <h2 className="expenses-list__fallback">No Results founs!</h2>;
  }
  return (
    <>
      <Table
        rowKey={(expenseItems) => expenseItems.id}
        dataSource={toJS(expenseItems)}
        columns={columns}
        pagination={true}
      />
      {items.isEditModalOpen && <EditExpense editingExpense={items} />}
    </>
  );
});
export default ExpensesList;
