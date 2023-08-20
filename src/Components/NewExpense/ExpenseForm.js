import React from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import expensesStore from "../../Store/ExpensesStore";
import "./ExpenseForm.css";
import FormItem from "antd/es/form/FormItem";

const ExpenseForm = observer(() => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formValues = { ...values, date: dayjs(values.date).toDate() };
    expensesStore.addExpense(formValues);

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
        <Button type="primary" onClick={expensesStore.handleCancelClick}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
});

export default ExpenseForm;
