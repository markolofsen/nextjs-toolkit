import React, {Component} from 'react';

// import {Link} from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import {confSite} from '../../../config/init.js'
import Link from 'next/link'

import theme from './theme.scss'

export default class Footer extends Component {

	state = {}

	render() {
    const {store} = this.props

		return (
			<div className={theme.wrapper}>
				<div data-content-inner>
					<ul>
						<li data-li="logotype">
							<h3>
								{store.mainTitle}
							</h3>
							<p>{store.copyrightSlogan}</p>
						</li>
						<li data-li="menu">
							<ul>
								<li>
									<Link href={`/p/free/`}>First order for free!</Link>
								</li>
							</ul>
							<ul>
								<li>
									<Link href={`/p/news/`}>News</Link>
								</li>
								<li>
									<Link href={`/p/support/`}>Support</Link>
								</li>
							</ul>
							<ul>
								<li>...</li>
							</ul>
							<div>
								<div data-el="gototop" onClick={() => window.scrollTo(0, 0)}>
									Go to top
								</div>
							</div>
						</li>
					</ul>
					<div data-el="copyright">
            {store.mainTitle} — registered trademark, © {store.copyrightYear}
					</div>
				</div>
			</div>
		)
	}
}
