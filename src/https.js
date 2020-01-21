import axios from 'axios'
import vue from 'vue'


const server = axios.create({
  // baseURL : '/api',
  baseURL : process.env.BASE_API,
  timeout : 15000,
  withCredentials : true,
  headers : {
    'Content-Type' : 'application/json;charset=UTF-8'
  },
  // transformRequest : function (data) {
  //   return JSON.stringify(data)
  // },
  // transformResponse : function (data) {
  //   return JSON.parse(data)
  // }
})

// //POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//   //在发送请求之前做某件事
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   console.log('错误的传参')
//   return Promise.reject(error);
// });
//
// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) => {
//   //对响应数据做些事
//   res.headers= 'Access-Control-Allow-Origin'
//   if (!res.data.success) {
//     return Promise.resolve(res);
//   }
//   return res;
// }, (error) => {
//   console.log('网络异常')
//   return Promise.reject(error);
// });

// 路由请求拦截
// http request 拦截器
server.interceptors.request.use(config => {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //判断是否存在token，如果存在的话，则每个http header都加上token
    const token = localStorage.getItem("token");
    if(token != undefined){
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 路由响应拦截
// http response 拦截器
// axios.interceptors.response.use(resp=> {
//   if (resp.status && resp.status == 200 && resp.data.code != '0') {
//     console.error({message: resp.data.message})
//     if (resp.data.code == '20301') {
//       // Token过期
//       setTimeout(() => {
//         window.location.href = location.origin + location.pathname;
//       }, 1000);
//     }
//     return Promise.resolve(resp);
//   }
//   return resp.data;
// }, err=> {
//   if(err.response == undefined){
//     console.error({message: err.message})
//   }else{
//     if (err.response.status == 504||err.response.status == 404) {
//       console.error({message: '服务器被吃了⊙﹏⊙∥'});
//     } else if (err.response.status == 403) {
//       console.error({message: '权限不足,请联系管理员!'});
//     }else {
//       console.error({message: '未知错误!'});
//     }
//   }
//   return Promise.resolve(err);
// });
/****** respone拦截器==>对响应做处理 ******/
server.interceptors.response.use(
  response => {  //成功请求到数据
    // app.$vux.loading.hide();
    //这里根据后端提供的数据进行对应的处理
    if (response.data.result === 'TRUE') {
      return response.data;
    } else {
      // app.$vux.toast.show({  //常规错误处理
      //   type: 'warn',
      //   text: response.data.data.msg
      // });
      console.log(response.data.data.msg);
    }
  },
  error => {  //响应错误处理
    console.log('error');
    console.log(error);
    console.log(JSON.stringify(error));

    let text = JSON.parse(JSON.stringify(error)).response.status === 404
      ? '404'
      : '网络异常，请重试';
    app.$vux.toast.show({
      type: 'warn',
      text: text
    });

    return Promise.reject(error)
  }
);
// export default axios;

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  console.log('httpsurl',url)
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
      console.log('httpsresponse',response)
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  fetchPost,
  fetchGet,
}
