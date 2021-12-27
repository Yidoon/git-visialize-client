import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

let chartInstance: any;
const WordCloud = (prop: any) => {
  const { data } = prop;
  const domRef = useRef();
  const initChart = () => {
    chartInstance = echarts.init(domRef.current!);
  };
  useEffect(() => {
    initChart();
  }, []);
  useEffect(() => {
    if (data && chartInstance) {
      chartInstance.setOption(data);
    }
  }, [data]);
  return <div id="chart-wrap" style={{ height: '400px', width: '100%' }} ref={domRef}></div>;
};

export default WordCloud;
