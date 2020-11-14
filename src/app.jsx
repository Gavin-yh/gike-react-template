import React from 'react'
import ReactDom from 'react-dom'

import Test from './pages/test/index.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Test></Test>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
