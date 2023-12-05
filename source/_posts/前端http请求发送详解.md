---
title: 前端http请求发送详解
tags:
  - http
  - 前端
categories: 前端
keywords: http，前端
description: http，前端
top_img: /img/qianduan.png
comments: true
cover: /img/qianduan.png
copyright_author: xingxing
copyright_author_href: www.staraway.asia
copyright_info: 可转载哦
date: 2023-12-05 14:15:54
---


## promise使用
-   `Promise`(承诺)，给予调用者一个承诺，过一会返回数据给你，就可以创建一个promise对象

-   当我们`new`一个`promise`，此时我们需要传递一个回调函数，这个函数为立即执行的，称之为（executor）

-   这个回调函数，我们需要传入两个参数回调函数，`reslove`,`reject`(函数可以进行传参)

    -   当执行了`reslove`函数，会回调promise对象的.then函数
    -   当执行了`reject`函数，会回调promise对象的.catche函数
```
new Promise((resolve, reject) => {
   //写入axios请求
  console.log(`executor 立即执行`)
})
```
如下代码为经典例

```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'iceweb.io') {
        //只能传递一个参数
        resolve('我成功了,把获取到的数据传出去')
      } else {
        reject('url错误，请求失败')
      }
    }, 3000)    
  })
}

//第一种写法
//url错误，请求失败,此时会有rej的打印输出
requestData('iceweb.org').then(res => {},rej => console.log(rej))

//第二种写法
//url错误，请求失败 此时会有e的打印输出
requestData('iceweb.org').catch(e => console.log(e))
```

### promise中catch的使用
在catch后仍可以调用then方法，因为catch返回的也是一个promise对象，且此时的promise中是resolve
```
const promise = new Promise((resolve, reject) => {
  reject('ice error')
})

promise.catch(err => ({name:'ice', age: 22})).then(res => console.log(res))

//{name:'ice', age: 22}
```
### promise中finally的使用
-   finally，无论promise状态是fulfilled还是rejected都会执行一次`finally`方法
```const promise = new Promise((resolve, reject) => {
  resolve('hi ice')
})

promise.then(res => console.log(res)).finally(() => console.log('finally execute'))

//finally execute

```

## promise回调地狱
1. 当我发送网络请求的时候，需要拿到这次网络请求的数据，再发送网络请求，就这样重复三次，才能拿到我最终的结果。导致如下结果(`很不优雅！！！`)

```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('iceweb')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}


requestData('iceweb.io').then(res => {
  requestData(`iceweb.org ${res}`).then(res => {
    requestData(`iceweb.com ${res}`).then(res => {
      console.log(res)
    })
  })
})

//iceweb.com iceweb.org iceweb.io

or

function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('iceweb')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}

requestData('iceweb.io').then(res => {
  return requestData(`iceweb.org ${res}`)
}).then(res => {
  return requestData(`iceweb.com ${res}`)
}).then(res => {
  console.log(res)
})

//iceweb.com iceweb.org iceweb.io
```

2.采用`async+await`解决回调地域现象

`await特点`——只有await后面的方法成功执行才会执行下面的代码！
```
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('iceweb')) {
        resolve(url)
      } else {
        reject('请求错误')
      }
    }, 1000);
  })
}

async function getData() {
  const res1 = await requestData('iceweb.io')
  const res2 = await requestData(`iceweb.org ${res1}`)
  const res3 = await requestData(`iceweb.com ${res2}`)

  console.log(res3)
}

getData()

//iceweb.com iceweb.org iceweb.io
```

## promise的高级封装（umi为例）

umi框架封装的请求可以在全局配置文件`src/app.ts`中对request进行配置

对于使用可以使用useRequest具体使用api
```
import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    }
  },
  requestInterceptors: [],
  responseInterceptors: []
};
```
也可以通过request直接使用api

```
export default () => {
  const { data, error, loading } = useRequest(() => {
    return services.getUserList('/api/test');
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data.name}</div>;
};
```

#思考与感悟

*最终做项目还是封装好的好用*



