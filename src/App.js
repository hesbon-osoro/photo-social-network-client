import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/Post';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import { auth } from './firebase';
import ImageUpload from './components/ImageUpload';
import axios from './axios';

const getModalStyle = () => {
	const top = 50;
	const left = 50;
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%,-${left}%)`,
	};
};

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState(null);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('/sync').then(res => setPosts(res.data));
	}, []);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				console.log(authUser);
				setUser(authUser);
			} else {
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	});
	const signUp = e => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(authUser => authUser.user.updateProfile({ displayName: username }))
			.catch(err => alert(err.message));
		setOpen(false);
	};

	const signIn = e => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => alert(err.message));
		setOpenSignIn(false);
	};
	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app__headerImage"
								src="logo192.png"
								alt="Header"
							/>
						</center>
						<Input
							placeholder="username"
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signUp}>
							Sign Up
						</Button>
					</form>
				</div>
			</Modal>
			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app__headerImage"
								src="logo192.png"
								alt="Header"
							/>
						</center>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button type="submit" onClick={signIn}>
							Sign In
						</Button>
					</form>
				</div>
			</Modal>
			<div className="app__header">
				<img className="app__headerImage" src="logo192.png" alt="Header" />
				{user ? (
					<Button onClick={() => auth.signOut()}>Logout</Button>
				) : (
					<div className="app__loginContainer">
						<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
						<Button onClick={() => setOpen(true)}>Sign Up</Button>
					</div>
				)}
			</div>

			<div className="app__posts">
				{posts.map(({ user, caption, image }) => (
					<Post username={user} caption={caption} imageUrl={image} />
				))}
			</div>
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3 className="app__notLogin">Need to login to upload</h3>
			)}
		</div>
	);
}

export default App;
