import React, { useState } from 'react';
import { Drawer, Select, Radio, Row, Button } from 'antd';
import { getCommitByBranchs } from '@/services/visialize/api';

const { Option } = Select;

interface IReport {
  visible: boolean;
  branchList?: any[];
  onCancle: () => void;
}
const Report = (props: IReport) => {
  const { visible, branchList, onCancle } = props;
  const [reportType, setReportType] = useState('weekly');
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [records, setRecords] = useState([]);
  const onRadioChange = (e) => {
    setReportType(e.target.value);
  };
  const generateReport = async () => {
    if (selectedBranch.length > 0 && reportType) {
      const params = {
        after: '1633276800',
        before: '1633881599',
        branchs: JSON.stringify(selectedBranch),
      };
      const res = await getCommitByBranchs(params);
      setRecords(res.data);
      console.log(res, 'ress');
    }
  };
  
  return (
    <Drawer visible={visible} width={680} title="查看报告" onClose={onCancle}>
      <Row>
        <Select
          style={{ width: 400 }}
          placeholder="请选择分支"
          mode="multiple"
          allowClear
          onChange={(val) => {
            setSelectedBranch(val);
          }}
        >
          {(branchList || []).map((item) => {
            return (
              <Option value={item} key={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Radio.Group onChange={onRadioChange} value={reportType}>
          <Radio value="weekly">Weekly</Radio>
          <Radio value="daily">Daily</Radio>
        </Radio.Group>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Button disabled={selectedBranch.length === 0} onClick={generateReport}>
          Generate
        </Button>
      </Row>
      <Row style={{ marginTop: 24 }}>
        {records.map((item, index) => {
          return (
            <p key={index}>
              {item.title} - {item.date}
            </p>
          );
        })}
      </Row>
    </Drawer>
  );
};

export default Report;
