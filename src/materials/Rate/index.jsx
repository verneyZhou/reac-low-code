import {Rate} from 'antd';

export const AntdRatePropsType = [
    {
        name: 'allowHalf',
        label: '是否允许半选',
        type: 'radio',
        default: true
    },
    {
        name: 'count',
        type: 'number',
        label: '总星星数',
        default: 10
    }
]


export const AntdRate = (props) => {
    return <Rate {...props}/>
}