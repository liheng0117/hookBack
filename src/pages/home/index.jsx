import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, Space, message } from 'antd'
import { connect } from 'react-redux'
import { InputModel } from '@@'
import {
  getTag,
  getRowKeys,
  getList,
  delList,
  addList,
  updateList,
} from '@/actions/home'
import './style.less'

function Home(props) {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('添加')
  const [fields, setFields] = useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => updateFn(record)}>编辑</Button>
          <Button onClick={() => delFn(record)}>删除</Button>
        </Space>
      ),
    },
  ]
  const {
    getTag,
    tagData,
    Rowkeys,
    getRowKeys,
    getList,
    data,
    addList,
    updateList,
  } = props
  const rowSelection = {
    selectedRowKeys: Rowkeys,
    onChange: (selectedRowKeys, selectedRows) => {
      getTag(selectedRows)
      getRowKeys(selectedRowKeys)
    },
  }
  const tagcacael = (key) => {
    const data = Rowkeys.filter((v) => {
      return v !== key
    })
    const data1 = tagData.filter((v) => {
      return v.key !== key
    })
    getRowKeys(data)
    getTag(data1)
  }
  const cancel = () => {
    getRowKeys([])
    getTag([])
  }
  // 获取数据列表
  useEffect(() => {
    getList()
  }, [])
  // 删除
  async function delFn(record) {
    let obj = { id: record.id }
    const del = await props.delList(obj)
    message.info(del.payload.info)
    if (del.payload.status === '200') {
      getList()
    }
  }
  // 修改
  const updateFn = (record) => {
    setVisible(true)
    setTitle('修改')
    setFields(record)
  }
  // 添加
  const addFn = () => {
    setTitle('添加')
    showModal()
  }
  const showModal = () => {
    setVisible(!visible)
  }
  // 确定表单  添加 / 编辑
  async function onFinish(values) {
    if (title === '添加') {
      const add = await addList(values)
      message.info(add.payload.info)
      if (add.payload.status === '200') {
        getList()
      }
    } else {
      let obj = { ...values, id: fields.id }
      const upd = await updateList(obj)
      message.info(upd.payload.message)
      if (upd.payload.status === '200') {
        getList()
      }
    }
    setVisible(false)
  }
  const onFinishFailed = (errorInfo) => {
    setVisible(false)
  }
  return (
    <div className="home">
      <div className="home_tag">
        {tagData === undefined
          ? null
          : tagData.map((val) => {
              return (
                <Tag
                  key={val.key}
                  style={{ marginTop: '5px' }}
                  closable
                  onClose={() => tagcacael(val.key)}
                >
                  {val.name}
                </Tag>
              )
            })}
      </div>
      <Button type="primary" onClick={addFn}>
        添加
      </Button>
      <InputModel
        title={title}
        visible={visible}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        showModal={showModal}
        fields={fields}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          onChange: cancel,
          pageSize: 5,
        }}
      />
    </div>
  )
}

export default connect(
  (state) => {
    return {
      tagData: state.home.tagData,
      Rowkeys: state.home.Rowkeys,
      data: state.home.data,
    }
  },
  {
    getTag,
    getRowKeys,
    getList,
    delList,
    addList,
    updateList,
  }
)(Home)
