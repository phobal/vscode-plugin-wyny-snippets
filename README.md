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


  <details><summary><b>创建一个 dva model 结构 - WYNY_CDvaM</b></summary>
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


### 如何贡献代码

请参考 [CONTRIBUTING](./CONTRIBUTING.md)