import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styles from './index.module.scss'
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'
import { TabBar } from 'antd-mobile'

export default class Home extends Component {
  constructor(props) {
    super()
    //这里的作用是每次刷新的时候可以选中当前的
    this.state = {
      selectedTab: props.location.pathname
    }
  }
  TABS = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/home/houselist'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/home/news'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/home/profile'
    }
  ]
  //组件更新会执行，这里切换路由的时候会执行，有一个参数prevProps代表上一个值
  //上面constructor里面的只会在页面刚打开或刷新的时候执行一次
  componentDidUpdate(prevProps) {
    //避免不必要的渲染，当两次点击的是同一个的时候不渲染，点两次的时候不会刷新,prevProps,nextProps和props用法都一样
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  renderTabBar = () => {
    return (
      <TabBar tintColor="#21B97A" noRenderContent>
        {this.TABS.map(item => {
          return (
            <TabBar.Item
              icon={<i className={`iconfont ${item.icon}`}></i>}
              selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
              title={item.title}
              key={item.path}
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                //第一种方式：直接改state
                // this.setState({
                //   selectedTab: item.path
                // })
                //相同页面连续点两次会有警告，所以需要加判断
                if(this.props.location.pathname!==item.path){
                    this.props.history.push(item.path)
                }
              }}
            ></TabBar.Item>
          )
        })}
      </TabBar>
    )
  }
  render() {
    return (
      <div className={styles.home}>
        <div>
          <Route exact path="/home" component={Index}></Route>
          <Route path="/home/houselist" component={HouseList}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/profile" component={Profile}></Route>
        </div>
        <div className={styles.tabbar}> {this.renderTabBar()}</div>
      </div>
    )
  }
}
