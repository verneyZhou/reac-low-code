
import ReactECharts from 'echarts-for-react';
import {useState, useEffect} from 'react'

export const LineChartPropsType = [
    {
        name: 'option',
        label: 'option',
        type: 'textarea',
        default: '{}'
    },
    {
        name: 'urlParams',
        label: '接口参数',
        type: 'input',
        default: ''
    }
]

// 线状图
export const LineChart = ({option, urlParams}) => {
    const [series, setSeries] = useState([150, 230, 224, 218, 135, 147, 260]);
    const [options, setOptions] = useState({});


    console.log('====options', option);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getOption = () => {
        try {
            setOptions(JSON.parse(option))
        } catch(err) {
            // alert('解析失败，JSON格式有误')
            console.error(err, '解析失败，JSON格式有误')
        }
    }

    // 组件每渲染一次，该函数就自动执行一次
    useEffect(() => {
        console.log('====urlParams', urlParams)
        // axios.get(`apihost${urlParams}`).then(res => setSeries(res.data))
    }, [urlParams])

    useEffect(() => {
        getOption()
    }, [getOption, option]) // 监听option, 当option变化时，执行getOption


    return (
        <ReactECharts
        option={{
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: series,
                type: "line",
              },
            ],
            ...options,
          }}
        />
    )
}