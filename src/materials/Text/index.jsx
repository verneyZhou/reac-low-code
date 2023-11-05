



// Text组件属性
export const TextPropsType = [
    {
        name: 'string',
        type: 'input',
        label: "文本内容",
        default: '默认文本'
    },
    {
        name: 'size',
        type: 'number',
        label: '文字大小',
        default: 16,
    },
    {
        name: 'color',
        type: 'color',
        label: '颜色',
        default: '#bbb',
    }
]

export const Text = ({string, size, color}) => {
    return <span style={{color, fontSize: size}}>{string || '默认文本'}</span>
}
