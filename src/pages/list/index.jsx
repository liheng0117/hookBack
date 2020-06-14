import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { getList } from '@/actions/list'
import './style.less'

function List(props) {
  const [data, SetData] = useState([])
  useEffect(() => {
    props.getList({ page: 1, limit: 12 }).then((res) => {
      SetData(res.payload.result.list)
    })
  }, [])
  const loadMoreData = (page) => {
    props.getList({ page: page, limit: 12 }).then((res) => {
      let newData = [...data, ...res.payload.result.list]
      SetData(newData)
    })
  }

  return (
    <div className="my_list">
      <InfiniteScroll
        initialLoad={false} // 不让它进入直接加载
        pageStart={1} // 设置初始化请求的页数
        loadMore={loadMoreData} // 监听的ajax请求
        hasMore={true} // 是否继续监听滚动事件 true 监听 | false 不再监听
        useWindow={false} // 是否监听 window 滚动条
        loader={
          <div className="load" key={0}>
            <Spin tip="Loading..." />
          </div>
        }
      >
        <div className="page-hoc">
          {data.map((v, i) => {
            return (
              <div key={i}>
                <p>{v.title}</p>
                <p>{v.tags}</p>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default connect(
  (state) => {
    return {
      listData: state.list.listData,
    }
  },
  {
    getList,
  }
)(List)
