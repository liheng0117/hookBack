import React from 'react'
import { Layout, Menu, Input } from 'antd'
import { connect } from 'react-redux'
import { searchList } from '@/actions/home'
import { Link } from 'react-router-dom'
import {
  FormOutlined,
  ShopOutlined,
  AppstoreOutlined,
  MenuOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'
import './style.less'

const { Header, Content, Sider } = Layout
const { Search } = Input

function LayoutPage(props) {
  const onSearch = (value) => {
    props.searchList(value)
  }
  return (
    <div className="my_layout">
      <Layout>
        <Header className="header">
          <h3>Forms - Wizard</h3>
          <Search
            placeholder="请输入搜索的内容"
            onSearch={(value) => onSearch(value)}
            style={{ width: 220 }}
          />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <ShopOutlined />
                <Link to="/"> Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <FormOutlined />
                <Link to="/list"> List</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <ApartmentOutlined />
                <Link to="/echart"> Echart</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <MenuOutlined />
                Forms
              </Menu.Item>
              <Menu.Item key="5">
                <AppstoreOutlined />
                Pages
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '20px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
export default connect(
  (state) => {
    return {}
  },
  {
    searchList,
  }
)(LayoutPage)
