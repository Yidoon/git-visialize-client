import { getContributors, getWorldCloud } from '@/services/visialize/api';
import { Card, Row, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { DataItem } from '../data.d';
import { wordcloud } from './WordCloud/echart-wordcloud';
import WordColudChart from './WordCloud/index';
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
    // console.log(wordCloudData, 'wordCloudData');
    return wordCloudData[specPerson] || [];
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
  console.log(exactWordCloudData, 'exactWordCloudData');
  return (
    <Card
      loading={loading}
      bordered={false}
      title="词云"
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
      <WordColudChart data={wordcloud(exactWordCloudData || [])} />
    </Card>
  );
};

export default TopSearch;
