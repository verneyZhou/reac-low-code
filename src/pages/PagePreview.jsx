import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import {componentsList} from '../materials'
import { message } from 'antd';


let isLoading = false;

// 预览页面
export const PagePreview = () => {
  let { id } = useParams();
  const history = useHistory()

  const [tempName, setTempName] = useState('')
  const [schemaRemote, setSchema] = useState([]);

  // const node = useMemo(() => schemaRemote.schema, [schemaRemote]);

  const getComponent = (name) => {
    return componentsList.find((item) => item.name === name);
  };

  // 渲染模板
  const renderComponents = () => {
    return schemaRemote.map((item) => {
      const Component = getComponent(item.name).component;
      return (
        <div key={item.id} className="mb-2">
            <Component {...item.props} style={{ ...item.style }} />
        </div>
      );
    });
  };

  useEffect(() => {
    console.log('====schemaRemote', schemaRemote)
    if (!id) return;
    // 获取模板详情
    if (isLoading) return;
    isLoading = true;
    message.loading('正在加载模板详情...', 0)
    axios.get(`/api/getTempDetail?id=${id}`).then((res) => {
      isLoading = false;
      message.destroy()
      console.log('====res', res)
      let {data = {}} = res.data
      console.log('====data', data)
      if (!data) return;
      setTempName(data.tempName || '')
      setSchema(JSON.parse(data.schema) || [])
  }).catch((err) => {
      isLoading = false;
      console.log('====err', err)
      message.destroy()
      message.error(err.message || '加载模板详情失败')
  })
  }, [id, schemaRemote]);

  return (
  <div className=" p-5 flex flex-col items-center">
    <div className="mb-3 mr-auto">
    <button className='' onClick={() => history.push('/create')}>创建模板</button>
    </div>
    <h3>{tempName}</h3>
    <div className=" border w-3/5 p-2" style={{minHeight: '100px'}}>
      {schemaRemote.length ? renderComponents() : '暂无数据~'}
    </div>
  </div>
  );
};
