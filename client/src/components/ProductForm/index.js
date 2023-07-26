import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";

export default function ProductForm({ onSubmit }) {
  const { status } = useSelector((state) => state.products);

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item label="Create Product"></Form.Item>
    </Form>
  );
}
