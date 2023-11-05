
/**
 * interface ButtonProps {
 *  name: string;
 *  type: String | Radio | Select ...;
 *  label: String;
 *  default: any; 
 * }
 */

// Button组件属性
export const ButtonPropsType = [
    {
        name: 'string',
        label: '按钮文字',
        type: 'input',
        default: '默认按钮'
    },
    {
        name: 'color',
        label: '颜色',
        type: 'color',
        default: '#ddd'
    }
]


export const Button = ({string, color}) => {
    return <button style={{color}}>{string || '默认按钮文案'}</button>
}