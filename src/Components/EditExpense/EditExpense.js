import {
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  InputNumber,
  ConfigProvider,
} from "antd";
import expensesStore from "../../Store/ExpensesStore";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const EditExpense = ({ editingExpense }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();

    const formValues = { ...values, date: dayjs(values?.date).toDate() };
    expensesStore.updateExpense(formValues);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    expensesStore.handleUpdateExpense();
  };

  return (
    <Modal
      title="Basic Modal"
      open={expensesStore.isEditModalOpen && !!editingExpense}
      onOk={handleSubmit}
      okText="Save"
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ flex: "50px" }}
        labelAlign="left"
        labelWrap
        initialValues={{
          title: editingExpense?.title,
          amount: editingExpense?.amount,
          id: editingExpense?.id,
          date: dayjs(editingExpense?.date),
        }}
        wrapperCol={{ flex: 1 }}
        layout="inline"
        form={form}
        // name="control-hooks"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <InputNumber type="number" min={0} />
        </Form.Item>

        <ConfigProvider locale={"en-US"}>
          <Form.Item name="date" label="Date">
            <DatePicker />
          </Form.Item>
        </ConfigProvider>
      </Form>
    </Modal>
  );
};
export default observer(EditExpense);
