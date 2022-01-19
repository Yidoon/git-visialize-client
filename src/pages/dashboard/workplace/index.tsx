import type { FC } from 'react';
import {
  Card,
  Col,
  Input,
  Row,
  Table,
  Space,
  Button,
  DatePicker,
  Form,
} from 'antd';
import { search, getBranchs } from '@/services/visialize/api';

import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';

import { queryProjectNotice } from './service';
import { useState, useEffect } from 'react';
import Report from './components/Report';
const { RangePicker } = DatePicker;

const Workplace: FC = () => {
  const { loading: projectLoading } = useRequest(queryProjectNotice);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [fileStatData, setFileStatData] = useState('');
  const [branchList, setBranchList] = useState<any[]>([]);
  const [isFileStat, setIsFileStat] = useState(false);
  const [filterForm] = Form.useForm();
  const [reportVisible, setReportVisible] = useState<boolean>(false);
  const lookCommitDetail = async (hash: string) => {
    // const res = await http.get('/api/look-commit-detail', {
    //   commit_hash: hash,
    // });
    setFileStatData('');
    setIsFileStat(true);
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Commit',
      dataIndex: 'commit',
      render: (value: string) => {
        return (
          <Space size={16}>
            <span>{value}</span>
            <Button
              onClick={() => {
                lookCommitDetail(value);
              }}
            >
              查看修改文件
            </Button>
          </Space>
        );
      },
    },
    {
      title: 'Commit Name',
      dataIndex: 'commit_name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    // {
    //   title: 'Commit note',
    //   dataIndex: 'commit_notes',
    // },
    // {
    //   title: 'Commit Content',
    //   dataIndex: 'content',
    // },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
  ];
  const reqSearch = async (params?: any) => {
    const res = await search(params);
    setList(res.data);
    setLoading(false);
  };
  const onSearch = async () => {
    const value = await filterForm.getFieldsValue();
    reqSearch(value);
  };
  const checkRepoort = () => {
    setReportVisible(true);
  };
  const reqBranchList = async () => {
    const res = await getBranchs();
    
    setBranchList(res.data);
  };
  useEffect(() => {
    reqSearch();
    reqBranchList();
  }, []);
  
  return (
    <PageContainer>
      <div style={{ marginBottom: 24, backgroundColor: '#ffffff', padding: 16 }}>
        <Form form={filterForm} layout="inline">
          <Form.Item label="Author" name="author">
            <Input placeholder="author" />
          </Form.Item>
          <Form.Item label="Author" name="commit_content">
            <Input placeholder="commit content" />
          </Form.Item>
          <Form.Item label="Time" name="Time">
            <RangePicker showTime />
          </Form.Item>
          <Space size={20}>
            <Button onClick={onSearch}>Search</Button>
            <Button onClick={checkRepoort}>周报/日报</Button>
          </Space>
        </Form>
      </div>
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="commit列表"
            bordered={false}
            extra={<Link to="/">crm-fe</Link>}
            loading={projectLoading}
            bodyStyle={{ padding: 0 }}
          >
            <Table loading={loading} dataSource={list} columns={columns} rowKey="commit" />
          </Card>
        </Col>
      </Row>
      <Report
        visible={reportVisible}
        onCancle={() => {
          setReportVisible(false);
        }}
        branchList={branchList}
      />
    </PageContainer>
  );
};

export default Workplace;
