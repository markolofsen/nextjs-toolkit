import Link from 'next/link'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../utils/withRoot';


import Router from 'next/router'

import s from './index.scss'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});


class Index extends React.Component {

  render() {
    return (
      <div>

        <p className={s.example}>Welcome to Page2</p>
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

export default withRoot(withStyles(styles)(Index));
