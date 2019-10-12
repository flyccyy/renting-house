import React from 'react'
import axios from 'axios'
import {BASE_URL} from './url'
axios.defaults.baseURL = BASE_URL
//把axios变为react的全局的，因为所有组件都挂载在Component上，所以要写在它的原型中
React.Component.prototype.$axios = axios