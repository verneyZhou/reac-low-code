

import {componentsList} from '../../materials'

// 左侧组件素材区
export const Material = () => {

    // 当拖动操作开始时触发，通常在拖动源元素上使用。
    const handleDragStart = (e, item) => {
        console.log('drag start', item)
        //设置拖拽数据
        e.dataTransfer.setData('text/plain', item.name)
    }


    return (
        <div className="border h-full p-2">
            <div className="font-bold text-lg">组件区</div>
            <div>
                {
                    componentsList.map((item, index) => {
                        return (
                            <div
                                key={index} className="border p-2 m-2 cursor-grab"
                                draggable onDragStart={e => handleDragStart(e, item)}

                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}