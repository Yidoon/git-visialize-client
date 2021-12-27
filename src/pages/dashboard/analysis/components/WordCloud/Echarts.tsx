import React, { useEffect } from 'react'

import * as echart from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/markLine'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'

// 需要监听 onresize 的方法
let instanceList: any[] = []

function addInstance (instance: any) {
  instanceList.push(instance)
}

function removeInstance (instance: any) {
  instanceList = instanceList.filter(item => item.id !== instance.id)
}

let timer: any
let handler = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    instanceList.forEach(instance => (instance.resize()))
  }, 300)
}
window.addEventListener('resize', handler)

function Echarts (props: any) {
  console.log(props, 'ppppp');
  
  let instance: any

  useEffect(() => {
    return () => {
      if (instance) {
        removeInstance(instance)
      }
    }
  })

  const initRef = (element: any) => {
    if (!element) return

    instance = echart.init(element)
    instance.setOption(props.chartData)
    addInstance(instance)
  }

  return <div className={props.clazz}>
    <div className="echarts-container" style={{ width: 600, height: 600 }} ref={initRef}>echart container</div>
    </div>
}

export default Echarts
