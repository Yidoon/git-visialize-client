import { getRepoInfo, getWeekCommit } from '@/services/visialize/api';
import { Progress, TinyColumn } from '@ant-design/charts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import type { DataItem } from '../data.d';
import styles from '../style.less';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const [repoInfo, setRepoInfo] = useState<any>({});
  const [weekCommitData, setWeekCommitData] = useState<any>({});
  const init = async () => {
    const res = await getRepoInfo();
    setRepoInfo(res.data);
  };
  const reqWeekCommit = async () => {
    const weekCommitRes = await getWeekCommit();
    console.log(weekCommitRes.data, '=====');

    setWeekCommitData(weekCommitRes.data);
  };
  const safeRun = useMemo(() => {
    if (repoInfo && repoInfo.first_commit_date) {
      return dayjs().diff(repoInfo.first_commit_date, 'day');
    }
    return '-';
  }, [repoInfo]);
  useEffect(() => {
    init();
    reqWeekCommit();
  }, []);
  console.log(repoInfo, 'repoInfo');
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="已平稳运行"
          action={
            <Tooltip title="第一条commit的时间">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => `${safeRun} 天`}
          footer={<Field label="第一次commit" value={repoInfo?.first_commit_date || '-'} />}
          contentHeight={46}
        >
          <span style={{ marginRight: 16 }}>
            总提交数量
            <span className={styles.trendText}>{repoInfo?.total_commit_count || ''}</span>
          </span>
          <span>
            总贡献人数
            <span className={styles.trendText}>{repoInfo?.contributors?.length || '-'}</span>
          </span>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="代码行数"
          loading={loading}
          total={() => `${repoInfo?.code_line_number?.total || '-'} 行`}
          footer={<Field label="革命还未成功" value="同志还需努力" />}
          contentHeight={46}
        >
          <span style={{ marginRight: 16 }}>
            新增行数
            <span className={styles.trendText}>{repoInfo?.code_line_number?.added || '-'}</span>
          </span>
          <span>
            删减行数
            <span className={styles.trendText}>{repoInfo?.code_line_number?.removed || '-'}</span>
          </span>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="最近七天commit概况"
          action={
            <Tooltip title="最近七天的commit统计">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={`${Number(weekCommitData?.total_week_commit_count)}次`}
          footer={<Field label="同比增长" value={`${weekCommitData?.up_rate} %`} />}
          contentHeight={46}
        >
          <TinyColumn
            xField="date"
            height={46}
            forceFit
            yField="count"
            data={weekCommitData?.week_commit}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="运营活动效果"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <Progress
            height={46}
            percent={0.78}
            color="#13C2C2"
            forceFit
            size={8}
            marker={[
              {
                value: 0.8,
                style: {
                  stroke: '#13C2C2',
                },
              },
            ]}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
