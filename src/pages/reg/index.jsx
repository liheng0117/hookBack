import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import { getReg } from '@/actions/reg'
import LoginHeadImg from '@/assets/login.png'
import './style.less'

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 7,
    span: 17,
  },
}
function Reg(props) {
  const [form] = Form.useForm()
  // 表单验证正确
  const onFinish = (values) => {
    props.getReg(values).then((res) => {
      message.info(res.payload.info)
      if (res.payload.status === '200') {
        props.history.push('/login')
      }
    })
  }
  // 表单验证错误
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="my_reg">
      <div className="my_reg_head">
        <img src={LoginHeadImg} alt="" />
      </div>
      <Form
        {...layout}
        className="my_reg_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pwd"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('pwd') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <a href="/login" style={{ paddingLeft: '30px' }}>
            去登录
          </a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  (state) => {
    return {}
  },
  {
    getReg,
  }
)(Reg)
