import React from 'react';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import withRoot from '../../../utils/withRoot';
import {connect} from 'react-redux';
// import Link from '../../Link';
// import Link, {prefetch} from '../../../components/link'
import {Link} from '../../../routes'
// import { I18n } from '../../../i18n'
import { observer } from 'mobx-react'
import store from '../../../data/store'
import { translate } from 'react-i18next'

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';

import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import Preloader from '../../../components/Preloader';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

const _ = require('lodash');

// import s from './theme.scss'


@translate('cat')
@observer
class MenuGenerator extends React.Component {

	state = {
		menu: false,
		open: true
	}

	componentDidMount() {
		this.setState({menu: this.props.data})
	}

	handleClick = () => {
		this.setState({open: !this.state.open});
	};

	render() {
		const {label, route, t} = this.props
		const {menu} = this.state

		if (!menu) {
			return <div/>
		}

		return (
			<List component="nav" subheader={<ListSubheader component="div" data-menu-label>{label}</ListSubheader>}>

				{menu.map((item, index) => {
					if (typeof item.submenu != 'undefined') {
						return (
							<div key={index}>
								<ListItem button onClick={this.handleClick}>
									<ListItemIcon>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText inset primary={t(item.label)}/> {this.state.open
										? <Icon>expand_less</Icon>
										: <Icon>expand_more</Icon>}
								</ListItem>
								<Collapse in={this.state.open} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{item.submenu.map((subitem, subindex) => {
											let params_ = {
												lang: store.language
											}
											if(route == 'catalog') {
											 	params_.folder = subitem.slug
											}

											return (
												<div key={`subindex-${index}-${subindex}`}>
													<Link route={route} params={params_}><a>
														<ListItem button dense>
															<ListItemText primary={t(subitem.label)}/>
														</ListItem>
													</a></Link>
												</div>
											)
										})}
									</List>
								</Collapse>
							</div>
						)
					} else {
						if (item.label == 'divider') {
							return (<Divider key={index}/>)
						} else {
							let params_ = {
								lang: store.language
							}
							if(route == 'catalog') {
							 	params_.folder = item.link
							}

							return (
								<div key={index}>
									<Link route={route} params={params_}><a>
										<ListItem button data-menulist-item>
											{item.icon && <ListItemIcon>
												<Icon>{item.icon}</Icon>
											</ListItemIcon>}
											<ListItemText primary={item.label}/>
										</ListItem>
									</a></Link>
								</div>
							)
						}
					}
				})}

			</List>
		)
	}
}
withStyles(styles)(MenuGenerator)



@observer
class MenuComponent extends React.Component {

	state = {}


	render() {

		const {classes} = this.props

		let menu_top = [
			{
				icon: 'home',
				link: '/',
				label: 'Home'
			},
		]

		let menu_public = [
			// {
			// 	label: 'divider'
			// }, {
			// 	icon: 'folder',
			// 	link: '/p/posts/',
			// 	label: 'Categories',
			// 	submenu: [
			// 		// {
			// 		// 	label: 'Catalog 1',
			// 		// 	slug: 'coool',
			// 		// 	hint: 0
			// 		// }, {
			// 		// 	label: 'Page 2',
			// 		// 	slug: false,
			// 		// 	hint: 0
			// 		// }, {
			// 		// 	label: 'Page 3',
			// 		// 	slug: false,
			// 		// 	hint: 0
			// 		// },
			// 	]
			// }, {
			// 	label: 'divider'
			{
				icon: 'stars',
				link: '/p/account/orders/',
				label: 'My orders'
			}, {
				icon: 'settings',
				link: '/',
				label: 'My settings'
			}, {
				label: 'divider'
			}, {
				icon: 'help',
				link: '/p/support/',
				label: 'Support'
			}
		];

			return (
				<div className={classes.leftMenu}>

					<MenuGenerator data={menu_top} route='index' label="Menu" />
					<Divider/>
					{store.settings && <MenuGenerator data={store.settings.menu} route='catalog' label="Menu" />}
					<Divider/>
					<MenuGenerator data={menu_public} route='index' label="Menu" />

				</div>
			);
		// }

		return <Preloader/>
	}
}

MenuComponent.propTypes = {
	// classes: PropTypes.object.isRequired
};


export default withStyles(styles)(MenuComponent);
