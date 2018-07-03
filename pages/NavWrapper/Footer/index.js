import React, {Component} from 'react';

// import {Link} from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import {confSite} from '../../../config/init.js'
// import Link from 'next/link'
import {Link} from '../../../routes'
import { I18n } from '../../../i18n'
import { translate } from 'react-i18next'


import theme from './theme.scss'

export default class Footer extends Component {

	state = {}

	render() {
    const {store} = this.props

		return (
			<div className={theme.wrapper}>
				<div data-content>
					<ul>
						<li data-li="logotype">
							<h3>
								{store.settings.sitename}
							</h3>
							<p>{store.settings.slogan}</p>
						</li>
						<li data-li="menu">
							<ul>
								<li>
									<Link route='catalog_all' params={{ lang: store.language }}><a>
										Home
									</a></Link>
								</li>
							</ul>
							<ul>
								<li>
									<Link href={`/p/news/`}><a>
										News
									</a></Link>
								</li>
								<li>
									<Link href={`/p/support/`}><a>
										Support
									</a></Link>
								</li>
							</ul>
							<ul>
								<li>
									<Link href={`/en`}><a>
										English
									</a></Link>
								</li>
								<li>
									<Link href={`/ru`}><a>
										Russian
									</a></Link>
								</li>
							</ul>
							<div>
								<div data-el="gototop" onClick={() => window.scrollTo(0, 0)}>
									Go to top
								</div>
							</div>
						</li>
					</ul>
					<div data-el="copyright">
            {store.settings.sitename} — registered trademark, © {store.settings.year}
					</div>
				</div>
			</div>
		)
	}
}
