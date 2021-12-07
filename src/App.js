import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/Post';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import { auth } from './firebase';

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
	const [posts, setPosts] = useState([
		{
			username: 'wazimu',
			caption: 'awesome websites using MERNG stack',
			imageUrl:
				'https://www.techlifediary.com/wp-content/uploads/2020/06/react-js.png',
		},
		{
			username: 'hesbon',
			caption: 'Such a beautiful world',
			imageUrl:
				'https://quotefancy.com/media/wallpaper/3840x2160/126631-Charles-Dickens-Quote-And-a-beautiful-world-you-live-in-when-it-is.jpg',
		},
	]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				console.log(authUser);
				setUser(authUser);
			}
		});
	});
	const signUp = e => {
		e.preventDefault();
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
			<div className="app__header">
				<img className="app__headerImage" src="logo192.png" alt="Header" />
				<Button onClick={() => setOpen(true)}>Sign Up</Button>
			</div>
			{posts.map(({ username, caption, imageUrl }) => (
				<Post username={username} caption={caption} imageUrl={imageUrl} />
			))}
		</div>
	);
}

export default App;
