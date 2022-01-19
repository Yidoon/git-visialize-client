import * as echarts from 'echarts';
import 'echarts-wordcloud';
import React, { useEffect, useRef } from 'react';

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
    if (data && data.series && chartInstance) {
      console.log(data, 'data=======');
      setTimeout(() => {
        chartInstance.setOption(data);
      }, 10);
    }
  }, [data]);
  return <div id="chart-wrap" style={{ height: '400px', width: '100%' }} ref={domRef} />;
};

export default WordCloud;
