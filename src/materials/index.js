


import {Button, ButtonPropsType} from './Button';
import {Text, TextPropsType} from './Text';
import {AntdRate, AntdRatePropsType} from './Rate';
import {LineChart, LineChartPropsType} from './LineChart';

export const componentsList = [
    {
        name: 'button',
        component: Button,
        propsType: ButtonPropsType,
    },
    {
        name: 'text',
        component: Text,
        propsType: TextPropsType,
    },
    {
        name: 'antdRate',
        component: AntdRate,
        propsType: AntdRatePropsType,
    },
    {
        name: 'lineChart',
        component: LineChart,
        propsType: LineChartPropsType,
    }
]