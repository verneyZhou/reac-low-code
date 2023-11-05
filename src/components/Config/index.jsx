
import React, {useContext} from 'react'
import {PageContext} from '../../store'
import {componentsList} from '../../materials'

import {cloneDeep} from 'lodash'
import {Radio, Input} from 'antd';
const { TextArea } = Input;


// 右侧属性配置区

export const Config = () => {
    const {curConfigId, node, setNode, refreshChart, setRefreshChart} = useContext(PageContext);


    console.log('====Config curConfigId', curConfigId)



    // 渲染配置表单
    const renderConfigForm = (item, curProps, onChange) => {
        const {type, name} = item
        const value = curProps[name]
        switch (type) {
            case 'input':
                return <Input type='text' value={value} onChange={(e) => onChange(e.target.value)}/>
            case 'textarea':
                return <TextArea rows={4} value={value} onChange={(e) => onChange(e.target.value)} onBlur={() => setRefreshChart(!refreshChart)} />
            case 'number':
                return <Input type='number' value={value} onChange={(e) => onChange(Number(e.target.value))}/>
            case 'color':
                return <Input type='color' value={value} onChange={(e) => onChange(e.target.value)}/>
            case 'radio':
                return (
                    <Radio.Group value={value} onChange={(e) => onChange(e.target.value)}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                )
            default:
                return null
        }
    }

    // 渲染组件配置
    const renderConfig = () => {
        if (curConfigId) {
            const curNode = node.find(item => item.id === curConfigId)
            const {name: curCompName, props: curProps, style} = curNode

            const allProps = componentsList.find(item => item.name === curCompName).propsType

            console.log('====allProps', allProps)


            // 修改属性
            const handleChange = (value, name) => {
                const copyNode = cloneDeep(node)
                const target = copyNode.find(item => item.id === curConfigId)
                target.props[name] = value // 修改属性
                setNode(copyNode) // 全量覆盖
            }
            return (
                <div className='p-2'>
                    <div className=' text-left mb-2'>当前组件：{curCompName}</div>
                    <div>
                        {
                            allProps.map((item, index) => {
                                return (
                                    <div key={index} className=" mb-1">
                                        <div className=' text-left'>{item.label}：</div>
                                        <div>
                                            {renderConfigForm(item, curProps, (value) => {
                                                handleChange(value, item.name)
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )

        } else {
            return (<div>请点击你要配置的组件~</div>)
        }
    }


    return (
        <div className="border h-full">
            <div className='p-2 font-bold text-lg'>配置组件</div>
            <div>
                {renderConfig()}
            </div>
        </div>
    )
}