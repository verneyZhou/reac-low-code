
import React, { useContext } from 'react'
import axios from 'axios'
import { PageContext } from '../../store'
import { useParams } from "react-router-dom";


// 头部区
export const Header = () => {
    let { id } = useParams();

    const {node, setNode, curConfigId, setCurConfigId } = useContext(PageContext);

    const handleClick = () => {
        // 请求后端接口，将页面数据保存到数据库
        let params = {
            schema: JSON.stringify(node),
            username: 'zhou',
            state: 1,
            timestamp: new Date().getTime(),
        }
        if (id) Object.assign(params, {id})
        axios.post(id ? `http://localhost:3001/page/${id}` : 'http://localhost:3001/page', params)
    }

    return (
        <div className="p-5 flex justify-between">
            <h2 className="text-2xl font-bold">React Low Code</h2>
            <div>
                <button onClick={handleClick}>{id ? '编辑' : '发布'}</button>
            </div>
        </div>
    )
}