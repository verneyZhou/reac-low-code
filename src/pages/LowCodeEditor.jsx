

import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Button, Modal, message } from 'antd';

import {Header} from '../components/Header'
import {Material} from '../components/Material'
import {Editor} from '../components/Editor'
import {Config} from '../components/Config'

import { PageContext } from '../store';


let isLoading = false;

export const LowCodeEditor = () => {

    /**
     * Schema结构：
     * {
     * title: string;
     * author: id;
     * node: Array<NodeItem>;
     * version: string;
     * }
     * 
     * // NodeItem结构：
     * interface NodeItem {
     *  `id`: string;
     * `name`: string;
     * `props`: Record<string, any>;
     * `style`: Record<string, any>;
     * `children`: Array<NodeItem>;
     * }
     */
    let { id } = useParams();
    const [node, setNode] = useState([])
    const [refreshChart, setRefreshChart] = useState(false)
    const [curConfigId, setCurConfigId] = useState('')
    const [tempName, setTempName] = useState('')

    useEffect(() => {
        console.log('==1111==schemaRemote', id)
        if (!id) return
        if (isLoading) return;
        isLoading = true;
        // 获取模板详情
        message.loading('正在加载模板详情...', 0)
        axios.get(`/api/getTempDetail?id=${id}`).then((res) => {
            isLoading = false;
            message.destroy()
            console.log('====res', res)
            let {data = {}} = res.data
            console.log('====data', data)
            if (!data) return;
            setTempName(data.tempName || '')
            setNode(JSON.parse(data.schema) || [])
        }).catch((err) => {
            isLoading = false;
            console.log('====err', err)
            message.destroy()
            message.error(err.message || '加载模板详情失败')
        })
      }, []);

    return (
        <PageContext.Provider value={{node, setNode, curConfigId, setCurConfigId, refreshChart, setRefreshChart, tempName, setTempName}}>
            <div className='h-full p-3'>
                <Header />
                <div className='flex h-full'>
                    <div className='w-1/4'>
                        <Material />
                    </div>
                    <div className='w-1/2'>
                        <Editor />
                    </div>
                    <div className='w-1/4'>
                        <Config />
                    </div>
                </div>
            </div>
        </PageContext.Provider>
        
    )
}