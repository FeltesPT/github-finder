import React from 'react';
import Navbar from './components/Layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/Layout/Alert';
import axios from 'axios';
import './App.css';

class App extends React.Component {
	state = {
		users: [],
		loading: false,
		alert: null
	};

	// async componentDidMount() {
	// 	this.setState({ loading: true });

	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({
	// 		users: res.data,
	// 		loading: false
	// 	});
	// }

	// Search Github users
	searchUsers = async text => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};

	// Clear users from state
	clearUsers = () => this.setState({ users: [], loading: false });

	// Creates an alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		const { users, loading, alert } = this.state;
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0}
						setAlert={this.setAlert}
					/>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
