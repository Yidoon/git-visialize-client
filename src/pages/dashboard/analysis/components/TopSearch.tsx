import { Card, Row, Col, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { DataItem } from '../data.d';
import { getWorldCloud, getContributors } from '@/services/visialize/api';
import WordColudChart from './WordCloud/index';
import { wordcloud } from './WordCloud/echart-wordcloud';
const { Option } = Select;
const TopSearch = ({
  loading,
}: {
  loading: boolean;
  visitData2: DataItem[];
  dropdownGroup: React.ReactNode;
  searchData: DataItem[];
}) => {
  const [wordCloudData, setWordCloudData] = useState<any>({});
  const [specPerson, setSpecPerson] = useState<any>('all');
  const [contributorList, setContributorList] = useState<any[]>([]);
  const exactWordCloudData = useMemo(() => {
    return wordCloudData[specPerson];
  }, [wordCloudData, specPerson]);
  const reqWordColud = async (contributor?: string) => {
    const res = await getWorldCloud(contributor);
    setWordCloudData(res.data);
  };
  const reqContributor = async () => {
    const res = await getContributors();
    setContributorList(res.data);
  };
  const onContributorChange = (val: string) => {
    setSpecPerson(val);
  };
  useEffect(() => {
    reqWordColud();
    reqContributor();
  }, []);
  return (
    <Card
      loading={loading}
      bordered={false}
      title="词云"
      // extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Row style={{ marginLeft: 24 }}>
        <Select
          style={{ width: 200 }}
          placeholder="请选择"
          showSearch
          onChange={onContributorChange}
        >
          {contributorList.map((item) => {
            return (
              <Option value={item.contributor} key={item.contributor}>
                {item.contributor}
              </Option>
            );
          })}
        </Select>
      </Row>
      <WordColudChart data={wordcloud(exactWordCloudData)} />
    </Card>
  );
};

export default TopSearch;
