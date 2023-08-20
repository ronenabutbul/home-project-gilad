import React from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import "./NewExpenseForm.css";

const NewExpenseForm = observer(({ expense }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formValues = { ...values, date: dayjs(values.date).toDate() };
    expense.addExpense(formValues);

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
      onFinish={onFinish}
    >
      <Form.Item name="title" label="Title">
        <Input placeholder="Enter Title" />
      </Form.Item>
      <Form.Item name="amount" label="Amount">
        <InputNumber type="number" min={0} placeholder="99.9" />
      </Form.Item>

      <Form.Item name="date" label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Submit">
        <Button type="primary" htmlType="submit">
          Add Expense
        </Button>
      </Form.Item>
      <Form.Item label="Cancel">
        <Button type="primary" onClick={expense.handleCancelClick}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
});

export default NewExpenseForm;
