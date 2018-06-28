import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Link from 'next/link'
import Button from '@material-ui/core/Button';

import privatePage from '../utils/privatePage';

import store from '../data/store'

@observer
class Page3 extends Component {
  render() {
    return (
      <div>
        Welcome to Page3 = {"" + store.age}
        <br />
        Now Clock q = {store.now}
        <br />
        <Link href={{ pathname: '/', query: { name: 'haha' } }}>
          <Button variant="raised" color="primary">
            Back
      </Button>
        </Link>
      </div>
    )
  }
}

export default privatePage(Page3);
// export default Page3
