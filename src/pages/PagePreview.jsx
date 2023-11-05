import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {componentsList} from '../materials'


// 预览页面
export const PagePreview = () => {
  let { id } = useParams();

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
        <span>
          <Component key={item.id} {...item.props} style={{ ...item.style }} />
        </span>
      );
    });
  };

  useEffect(() => {
    // 获取模板详情
    axios
      .get(`http://localhost:3001/page/${id}`)
      .then((res) => setSchema(JSON.parse(res.data.schema)));
  }, []);

  return <div>{renderComponents()}</div>;
};
