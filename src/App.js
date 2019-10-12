import React from 'react'
import './App.css'

//字体图标样式全局导入
import './assets/fonts/iconfont.css'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'

//双引号这些是不符合eslint规范的，规范应该是单引号，不要分号
function App() {
  return (
    <Router>
      <div id="App">
        {/* 不管是写404还是重定向，都加switch包裹 */}
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Redirect exact from="/" to="/home"></Redirect>
        </Switch>
      </div>
    </Router>
  )
}

export default App
