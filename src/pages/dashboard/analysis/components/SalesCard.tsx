import {
  getContributorCommitDataByMonth,
  getContributors,
  getContributorsCommitData,
} from '@/services/visialize/api';
import { Column, Line } from '@ant-design/charts';
import { Card, Col, DatePicker, Row, Select, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import numeral from 'numeral';
import { useEffect, useMemo, useState } from 'react';
import type { DataItem } from '../data.d';
import styles from '../style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: TimeType) => string;
  salesData: DataItem[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: TimeType) => void;
}) => {
  const [contributorsCommitData, setContributorsCommitData] = useState<any[]>([]);
  const [commitOfMonth, setCommitOfMonth] = useState<any[]>([]);
  const [contributorList, setContributorList] = useState<any[]>([]);
  const rankCommitList = useMemo(() => {
    return contributorsCommitData.sort((a, b) => {
      return b.value - a.value;
    });
  }, [contributorsCommitData]);
  const personMonthRankList = useMemo(() => {
    return commitOfMonth.sort((a, b) => {
      return b.commit - a.commit;
    });
  }, [commitOfMonth]);
  const reqCommitDataOfTeam = async () => {
    const res = await getContributorsCommitData();
    setContributorsCommitData(res.data);
  };
  const reqMonthCommit = async (contributor?: string) => {
    const res = await getContributorCommitDataByMonth(contributor);
    setCommitOfMonth(res.data);
  };
  const reqContributor = async () => {
    const res = await getContributors();
    setContributorList(res.data);
  };
  const onContributorChange = (val: string) => {
    reqMonthCommit(val);
  };
  useEffect(() => {
    reqCommitDataOfTeam();
    reqMonthCommit();
    reqContributor();
  }, []);

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab="成员commit概览" key="sales">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Column
                    height={300}
                    forceFit
                    data={contributorsCommitData as any}
                    xField="name"
                    yField="value"
                    xAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    yAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    title={{
                      visible: true,
                      text: 'commit数量',
                      style: {
                        fontSize: 14,
                      },
                    }}
                    meta={{
                      y: {
                        alias: 'cimmit量',
                      },
                    }}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Commit数量排名</h4>
                  <ul className={styles.rankingList}>
                    {rankCommitList.slice(0, 7).map((item, i) => (
                      <li key={item.name}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.name}>
                          {item.name}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.value).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="个人commit概览" key="views">
            <Row style={{ marginLeft: 24 }}>
              <Select
                style={{ width: 200 }}
                placeholder="请选择"
                showSearch
                onChange={onContributorChange}
                allowClear
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
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Line
                    height={300}
                    forceFit
                    data={commitOfMonth as any}
                    xField="month"
                    yField="commit"
                    xAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    yAxis={{
                      visible: true,
                      title: {
                        visible: false,
                      },
                    }}
                    title={{
                      visible: true,
                      text: 'commit趋势',
                      style: {
                        fontSize: 14,
                      },
                    }}
                    meta={{
                      y: {
                        alias: '月commit数量',
                      },
                    }}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>commit月份排名</h4>
                  <ul className={styles.rankingList}>
                    {personMonthRankList.slice(0, 7).map((item, i) => (
                      <li key={item.month}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.month}>
                          {item.month}
                        </span>
                        <span>{numeral(item.commit).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default SalesCard;
