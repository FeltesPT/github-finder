import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);

	const { user, loading, repos, getUser, getUserRepos } = githubContext;

	useEffect(() => {
		getUser(match.params.username);
		getUserRepos(match.params.username);
		// eslint-disable-next-line
	}, []);

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
	} = user;

	if (loading) {
		return <Spinner />;
	}

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to Home
			</Link>
			Hirable:{' '}
			{hirable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
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
			<Repos repos={repos} />
		</Fragment>
	);
};

export default User;
