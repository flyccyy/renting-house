import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import styles from './index.module.scss'
import { BASE_URL } from '../../utils/url'

export default class Index extends Component {
  constructor() {
    super()
    this.state = {
      //loading判断数据是否接收完
      isLoadingSwipers: true,
      swipers: [],
      imgHeight: 212
    }
  }
  //请求数据
  async getSwipers() {
    let res = await this.$axios.get('/home/swiper')
    this.setState({
      isLoadingSwipers: false,
      swipers: res.data.body
    })
  }
  componentDidMount() {
    this.getSwipers()
  }
  //轮播图渲染
  renderCarousel = () => {
    return (
      <Carousel autoplay infinite>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASE_URL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.swiper}>
          {/* 需要等数据回来后才渲染  */}
          {!this.state.isLoadingSwipers && this.renderCarousel()}
        </div>
      </div>
    )
  }
}
