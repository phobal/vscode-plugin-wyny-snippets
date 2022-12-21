/**
 * @prefix WYNY_CA3F
 * @description 创建 antd3 版本的 Form 表单
 */
import React from "react";
import { Form, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";

type $1Props = {
  form: WrappedFormUtils;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function $1(props: $1Props): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form {...formItemLayout}>
      <Form.Item label="姓名">
        {getFieldDecorator("name", {
          initialValue: "",
          rules: [
            {
              required: true,
            },
          ],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
}

export default Form.create<$1Props>()($1);
