import {
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  InputNumber,
  ConfigProvider,
} from "antd";
import { toJS } from "mobx";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const EditExpense = ({ editingExpense }) => {
  const expenseToEdit = toJS(editingExpense.editingExpense);

  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();

    const formValues = { ...values, date: dayjs(values?.date).toDate() };
    editingExpense.updateExpense(formValues);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    editingExpense.handleUpdateExpense();
  };

  return (
    <Modal
      title="Basic Modal"
      open={editingExpense.isEditModalOpen && !!editingExpense}
      onOk={handleSubmit}
      okText="Save"
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ flex: "50px" }}
        labelAlign="left"
        labelWrap
        initialValues={{
          title: expenseToEdit?.title,
          amount: expenseToEdit?.amount,
          id: expenseToEdit?.id,
          date: dayjs(expenseToEdit?.date),
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
