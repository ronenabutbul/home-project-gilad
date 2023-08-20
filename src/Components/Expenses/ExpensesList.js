import { Space, Table, Button } from "antd";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import expensesStore from "../../Store/ExpensesStore";
import EditExpense from "../EditExpense/EditExpense";
const ExpensesList = observer(({ items }) => {
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
              expensesStore.handleUpdateExpense(id);
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
        <Space size="middle">
          <Button onClick={() => expensesStore.removeExpense(id)}>
            Remove Expense
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey={(items) => items.id}
        dataSource={toJS(items)}
        columns={columns}
        pagination={false}
      />
      {expensesStore.isEditModalOpen && (
        <EditExpense editingExpense={expensesStore.editingExpense} />
      )}
    </>
  );
});
export default ExpensesList;
