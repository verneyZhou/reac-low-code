

import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import {Header} from '../components/Header'
import {Material} from '../components/Material'
import {Editor} from '../components/Editor'
import {Config} from '../components/Config'

import { PageContext } from '../store';


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

    useEffect(() => {
        if (!id) return
        axios
          .get(`http://localhost:3001/page/${id}`)
          .then((res) => setNode(JSON.parse(res.data.schema)));
      }, []);

    return (
        <PageContext.Provider value={{node, setNode, curConfigId, setCurConfigId, refreshChart, setRefreshChart}}>
            <div className='h-full p-2'>
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