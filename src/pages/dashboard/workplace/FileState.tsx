import { Drawer } from 'antd';
import React from 'react';

const FileState = (props) => {
  const { data, visible, onCancle } = props;
  return (
    <Drawer visible={visible} title="修改的文件" onClose={onCancle} width="960">
      <p style={{ whiteSpace: 'pre-line' }}>{data}</p>
    </Drawer>
  );
};

export default FileState;
