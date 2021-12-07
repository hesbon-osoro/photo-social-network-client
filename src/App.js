import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/Post';

function App() {
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
	return (
		<div className="app">
			<div className="app__header">
				<img className="app__headerImage" src="logo192.png" alt="Header" />
			</div>
			{posts.map(({ username, caption, imageUrl }) => (
				<Post username={username} caption={caption} imageUrl={imageUrl} />
			))}
		</div>
	);
}

export default App;
