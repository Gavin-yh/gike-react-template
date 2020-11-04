import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, createMemoryHistory } from 'react-router'

import _ from 'lodash'

import AreaInfo from '~/helpers/area-info';
import Test from './pages/test/index'
import '~/assets/css/app.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: null,
    }
  }

  componentWillMount() {
    // TODO - SPA模式
    // 1. 使用MemoryHistory，避免受iframe的src影响
    // 2. 需要经window.odin.initReactHistory
    const memoryHistory = createMemoryHistory()

    window.odin.getAreaInfo().then((res) => {
      AreaInfo.update(res.data)
      
      return window.odin.initReactHistory(memoryHistory)
    }).then((history) => {
      // TODO - 应用已就绪
      window.odin.ready()

      this.setState({
        history
      })
    })
  }

  render() {
    const { history } = this.state

    return (
      <div>
        {history ? (
          <Router history={history}>
            <Route path="/test" component={Test} />
          </Router>
        ) : null}
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
