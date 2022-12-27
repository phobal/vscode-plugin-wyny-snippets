/**
 * @prefix WYNY_CA3CF
 * @description 创建 antd3 版本的自定义表单组件
 */
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
