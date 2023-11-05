
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { PageContext } from '../../store'
import { useParams, useHistory } from "react-router-dom";
import { Button, Modal, message } from 'antd';


// 头部区
export const Header = () => {
    let { id } = useParams();
    const history = useHistory()

    const {node, setNode, curConfigId, setCurConfigId, tempName, setTempName } = useContext(PageContext);
    const [tempList, setTempList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleClick = async () => {
        // 请求后端接口，将页面数据保存到数据库
        let params = {
            schema: JSON.stringify(node),
            tempName: tempName || `未命名__${+new Date()}`,
            username: 'zhou',
            state: 1,
            id: +new Date(),
            timestamp: new Date().getTime(),
        }
        if (id) Object.assign(params, {id})
        let api  = id ? '/api/updateTemp' : '/api/addTemp';
        message.loading('正在保存...', 0)
        try {
            const res = await axios.post(api, params)
            message.destroy()
            message.success('保存成功')
        } catch (error) {
            message.destroy()
            message.error(error.message || '保存失败')
        }
    }


    const handleShowList = () => {
        // 请求后端接口，将页面数据保存到数据库
        message.loading('正在加载模板列表...', 0)
        axios.get(`/api/getTempList`).then((res) => {
            message.destroy()
            console.log('====res', res)
            let {data = []} = res.data
            console.log('====data', data)
            setTempList(data || [])
            setIsModalOpen(true)
        }).catch((err) => {
            message.destroy()
            message.error(err.message || '加载模板列表失败')
        })
    }

    const onDetail = (item) => {
        console.log('====item', item)
        setIsModalOpen(false)
        history.push(`/page/${item.id}`)
    }


    const onEdit = (item) => {
        setIsModalOpen(false)
        // history.push(`/editor/${item.id}`)
        window.location.href = `/editor/${item.id}`
    }

    const onDel = (item) => {
        Modal.confirm({
            title: '提示',
            content: '确定要删除该模板吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                message.loading('正在删除...', 0)
                try {
                    await axios.post('/api/delTemp', {id: item.id})
                    message.destroy()
                    message.success('删除成功')
                    setTempList(tempList.filter((temp) => temp.id !== item.id))
                } catch (error) {
                    message.destroy()
                    message.error(error.message || '删除失败')
                }
            }
        })
    }

    return (
        <div className="p-5 flex justify-between">
            <h2 className="text-2xl font-bold">React Low Code</h2>
            <div>
            <button className=' mr-2' onClick={() => window.location.href = '/create'}>创建模板</button>
                <button className=' mr-2' onClick={handleShowList}>模板列表</button>
                <input className=' mr-2' type="text" placeholder='输入页面名称' value={tempName} onChange={(e) => setTempName(e.target.value)}/>
                <button onClick={handleClick}>{id ? '编辑' : '发布'}</button>
            </div>
            <Modal title="模板列表" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <ul className=' mb-5'>
                    {
                        tempList.map((item) => {
                            return <li key={item.id} className=" flex p-3 border-bottom-1">
                                <div className=' mr-auto'>{item.tempName}</div>
                                <button className=' mr-2' onClick={() => onEdit(item)}>编辑</button>
                                <button className=' mr-2' onClick={() => onDetail(item)}>预览</button>
                                <button className=' mr-2' onClick={() => onDel(item)}>删除</button>
                                </li>
                        })
                    }
                </ul>
            </Modal>
        </div>
    )
}