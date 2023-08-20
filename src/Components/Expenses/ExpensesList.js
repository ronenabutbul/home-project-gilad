import { Space, Table, Button, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import EditExpense from "../EditExpense/EditExpense";
const ExpensesList = observer(({ items }) => {
  const expenseItems = toJS(items.filteredExpenses);
  const columns = [
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
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
          title="Sure you want delect?"
          onConfirm={() => items.removeExpense(id)}
        >
          <Space size="middle">
            <Button>Remove Expense</Button>
          </Space>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey={(expenseItems) => expenseItems.id}
        dataSource={toJS(expenseItems)}
        columns={columns}
        pagination={false}
      />
      {items.isEditModalOpen && <EditExpense editingExpense={items} />}
    </>
  );
});
export default ExpensesList;
