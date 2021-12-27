import { Card, Radio, Typography, Row, Col } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import type { DonutConfig } from '@ant-design/charts/es/donut';
import React, { useEffect, useState } from 'react';
import type { DataItem } from '../data.d';
import styles from '../style.less';
import { getFileCommitTop10, getFileLineCodeTop10 } from '@/services/visialize/api';

const { Text } = Typography;

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  const [fileChangeRankList, setFileChangeRankList] = useState<any[]>([]);
  const [fileCodeLineRankList, setFileCodeLineRankList] = useState<any[]>([]);
  const reqFileCommitRank = async () => {
    const res = await getFileCommitTop10();
    setFileChangeRankList(res.data);
  };
  const reqFileCodeLineRank = async () => {
    const res = await getFileLineCodeTop10();
    setFileCodeLineRankList(res.data);
  };
  useEffect(() => {
    reqFileCommitRank();
    reqFileCodeLineRank();
  }, []);
  console.log(fileChangeRankList, 'fileChangeRankList');
  console.log(fileCodeLineRankList, 'fileCodeLineRankList');

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="文件相关统计数据"
      style={{
        height: '100%',
      }}
    >
      <div>
        <Row style={{ width: '100%' }}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>文件代码行数排名</h4>
              <ul className={styles.rankingList}>
                {fileCodeLineRankList.slice(0, 7).map((item, i) => (
                  <li key={item.path}>
                    <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.path}>
                      {item.path}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {`${numeral(item.code_line).format('0,0')} 行`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>文件修改次数排名</h4>
              <ul className={styles.rankingList}>
                {fileChangeRankList.slice(0, 7).map((item, i) => (
                  <li key={item.path}>
                    <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.path}>
                      {item.path}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {`${numeral(item.change_count).format('0,0')}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ProportionSales;
