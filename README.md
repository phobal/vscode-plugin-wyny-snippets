## 万益能源前端代码片段 VSCode 插件

> 日常业务开发中一些常用的代码片段

[🔽Download](https://marketplace.visualstudio.com/items?itemName=phobal.vscode-plugin-wyny-snippets)


  <details><summary><b>创建基于 antd3 表单模板代码 - WYNY_CA3F</b></summary>
    <p>

    ``` tsx
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
    ```
  </p>
</details>


  <details><summary><b>创建 antd3 版本的自定义表单组件结构 - WYNY_CA3CF</b></summary>
    <p>

    ``` tsx
      import React, { forwardRef } from 'react';
      import { Input } from 'antd';

      type $1Props = {
        value: string;
        onChange: () => void;
      };

      const $1: React.ForwardRefRenderFunction<any, $1Props> = (
        { value, onChange },
        ref,
      ) => {
        return <Input ref={ref} value={value} onChange={onChange} />;
      };

      export default forwardRef($1);

    ```
  </p>
</details>
<details><summary><b>创建 antd3 版本的弹窗表单 ModalForm 结构 - WYNY_CA3MF</b></summary>
    <p>

    ``` tsx
      import { getList } from './service'

      export const namespace = '$1'

      export default {
        namespace,
        state: {
          data: []
        },
        effects: {
          *fetch({ payload }, { call, put }) {
            const res = yield call(getList, payload)
            if (res?.data) {
              yield put({
                type: 'setState',
                payload: {
                  data: res.data
                }
              })
            }
          }
        },
        reducers: {
          setState(state, { payload }) {
            return {
              ...state,
              ...payload,
            }
          }
        },
      }

    ```
  </p>
</details>
<details><summary><b>创建一个 dva model 结构 - WYNY_CDvaM</b></summary>
    <p>

    ``` tsx
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

    ```
  </p>
</details>


### 如何贡献代码

请参考 [CONTRIBUTING](http://gitlab.in.chinawyny.com/front-end/infra/vscode-wyny-code-snippets/-/blob/master/CONTRIBUTING.md)