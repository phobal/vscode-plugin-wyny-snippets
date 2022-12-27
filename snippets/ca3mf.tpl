
/**
 * @prefix WYNY_CA3MF
 * @description 创建 antd3 版本的弹窗表单 ModalForm
 */
import React from "react";
import { Modal, Form, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";

type $1Props = {
  visible: Boolean;
  form: WrappedFormUtils;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function $1(props: $1Props): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;
  const onOk = () => {
    form.validateFields((err, values) => {
      if (err) return
      console.log(values)
    })
  }
  return (
    <Modal visible={visible} width={500} title="新增" onOk={onOk}>
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
    </Modal>
  );
}

export default Form.create<$1Props>()($1);