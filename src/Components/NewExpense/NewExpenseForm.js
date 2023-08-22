import React from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, InputNumber, App } from "antd";
import { observer } from "mobx-react-lite";
import "./NewExpenseForm.css";

const NewExpenseForm = observer(({ expense }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const handelSubmit = (values) => {
    const formValues = { ...values, date: dayjs(values.date).toDate() };
    expense.addExpense(formValues);
    message.success("Expense Added");
    form.resetFields();
  };

  return (
    <Form
      labelCol={{ flex: "50px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      layout="inline"
      form={form}
      name="control-hooks"
      onFinish={handelSubmit}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input expense title" }]}
      >
        <Input placeholder="Enter Title" />
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: "Please input expense amount" }]}
      >
        <InputNumber type="number" min={0} placeholder="99.9" />
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select expense date" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Submit">
        <button type="primary" htmlType="submit">
          Add Expense
        </button>
      </Form.Item>
      <Form.Item label="Cancel">
        <button type="primary" onClick={expense.handleCancelClick}>
          Cancel
        </button>
      </Form.Item>
    </Form>
  );
});

export default NewExpenseForm;
