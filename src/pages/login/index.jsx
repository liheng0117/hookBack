import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { connect } from 'react-redux'
import { getUser } from '@/actions/login'
import LoginHeadImg from '@/assets/login.png'
import './style.less'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
}
function Login(props) {
  const { getUser } = props
  const [form] = Form.useForm()
  useEffect(() => {
    // 判断本地是否有值  若有值 回填到表单
    const myUser = sessionStorage.getItem('myUser')
    if (myUser !== null) {
      form.setFieldsValue(JSON.parse(myUser))
    }
  }, [])
  // 表单验证正确
  const onFinish = (values) => {
    // 判断是否记住密码
    // 记住密码-》存入本地
    // 没有记住密码 -》清空本地
    if (values.remember) {
      sessionStorage.setItem('myUser', JSON.stringify(values))
    } else {
      sessionStorage.clear()
    }
    getUser(values).then((res) => {
      message.info(res.payload.message)
      if (res.payload.status === '200') {
        props.history.push('/')
      }
    })
  }
  // 表单验证错误
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="my_login">
      <div className="my_login_head">
        <img src={LoginHeadImg} alt="" />
      </div>
      <Form
        {...layout}
        className="my_login_form"
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
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

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <a href="/reg" style={{ paddingLeft: '30px' }}>
            去注册
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
    getUser,
  }
)(Login)
