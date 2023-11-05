
import React, {useContext} from 'react'

import {componentsList} from '../../materials'
import {PageContext} from '../../store'
import {v4} from 'uuid'
import { ReactSortable } from "react-sortablejs";



// 中间组件预览编辑区

export const Editor = () => {
    // const [comp, setComp] = useState(null);
    const {node, setNode, setCurConfigId } = useContext(PageContext);

    // 当被拖动的元素在可放置目标上方移动时触发，通常在目标元素上使用。需要阻止默认行为才能接受拖放。
    const handleDragOver = (e) => {
        // console.log('====onDragOver',e);
        e.preventDefault()
    }

    // 当被拖动的元素放置在可放置目标上时触发，通常在目标元素上使用
    const handleDrap = (e) => {
        // 拿到拖拽的数据
        let dropEleName = e.dataTransfer.getData('text/plain')
        console.log('====onDrop dropEleName', dropEleName)
        // setComp(JSON.parse(data))
        const dropEle = componentsList.find(item => item.name === dropEleName)
        console.log('====onDrop dropEle', dropEle)
        if (!dropEle) return;

        const comPropsType = dropEle.propsType
        const defaultProps = {}
        comPropsType.forEach(item => {
            defaultProps[item.name] = item.default // 初始化默认属性
        })
        // 初始化组件属性
        setNode(node.concat({
            id: v4(),
            name: dropEle.name,
            // 初始化拖拽，组件内部有默认属性
            props: defaultProps,
            style: {},
            children: []
        }))
    }

    // 获取当前组件id
    const handleConfig = (id) => {
        console.log('====handleConfig', id)
        setCurConfigId(id);
    }

    // 根据name获取组件
    const getComponent = (name) => {
        return componentsList.find(item => item.name === name)
    }

    // 组件渲染
    const renderComponents = () => {
        // const Component = getComponent(comp.name).component
        // console.log('====renderComponents', Component)
        return node.map(item => {
            // console.log('====renderComponents item', item, getComponent(item.name))
            const Component = getComponent(item.name).component
            return (
                <div key={item.id} onClick={() => handleConfig(item.id)} className="cursor-pointer mb-2">
                    <Component {...item.props} style={{...item.style}}/>
                </div>
            )
        })
    }

    return (
        <div
            className="border h-full p-2"
            onDrop={handleDrap}
            onDragOver={handleDragOver}
        >
            {node.length ? 
            <ReactSortable list={node} setList={setNode}>{renderComponents()}</ReactSortable> : 
            <div>请将组件拖拽到这里</div>}
        </div>
    )
}