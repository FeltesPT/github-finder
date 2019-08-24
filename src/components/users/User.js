import React, { Fragment, Component } from 'react';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.username);
	}

	static propTypes = {
		loading: PropTypes.bool,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired
	};

	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			company,
			followers,
			following,
			public_repos,
			public_gists,
			hirable
		} = this.props.user;

		const { loading } = this.props;

		if (loading) {
			return <Spinner />;
		}

		return (
			<Fragment>
				<Link to='/' className='btn btn-light'>
					Back to Home
				</Link>
				Hirable:{' '}
				{hirable ? (
					<i className='fas fa-check text-success' />
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						<img src={avatar_url} alt='' className='round-img' style={{ width: '150px' }} />
					</div>
					<h1>{name}</h1>
					<p>Location: {location}</p>
					<div>
						{bio && (
							<Fragment>
								<h3>Bio</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						<a href={html_url} className='btn btn-dark my-1'>
							Visit Github Profile
						</a>
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username: {login}</strong>
									</Fragment>
								)}
							</li>
							<li>
								{login && (
									<Fragment>
										<strong>Company: {company}</strong>
									</Fragment>
								)}
							</li>
							<li>
								{login && (
									<Fragment>
										<strong>Website: {blog}</strong>
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers: {followers}</div>
					<div className='badge badge-success'>Following: {following}</div>
					<div className='badge badge-light'>Public Repost: {public_repos}</div>
					<div className='badge badge-dark'>Public gists: {public_gists}</div>
				</div>
			</Fragment>
		);
	}
}

export default User;
