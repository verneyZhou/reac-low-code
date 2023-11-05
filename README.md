
# 低代码平台实践




[react官网](https://zh-hans.react.dev/)


> node v16+


初始化项目：npx create-react-app react-low-code


> react v18+


## tailwindcss

https://tailwindcss.com


- 安装
```
npm install -D tailwindcss

npx tailwindcss init
```

- 配置`tailwind.config.js`


- `src.index.css`添加：
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```







## 拖拽 drag

传参： https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer


`DataTransfer.setData()`, `DataTransfer.getData()`




## antd

https://ant.design/components/overview-cn/


npm install antd -S


## 拖拽排序

SortableJS：https://github.com/SortableJS/react-sortablejs


npm install --save react-sortablejs sortablejs -S


## Echart

https://github.com/hustcc/echarts-for-react


npm install echarts-for-react echarts -S





## Vercel部署



### 报错记录

- `vercel --prod`报错：`Command "react-scripts build" exited with 127`

> vercel的`Root Directory`配置问题，参考：https://github.com/vercel/next.js/discussions/40733

### 添加 Serverless接口


- 接口：`api/...`

### 添加MongoDB云数据库



