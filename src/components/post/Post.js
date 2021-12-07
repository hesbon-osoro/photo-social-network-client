import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css';

const Post = ({ username, caption, imageUrl }) => {
	return (
		<div className="post">
			<div className="post__header">
				<Avatar className="post__avatar" alt={username} src="logo512.png" />
				<h3>{username}</h3>
			</div>
			<img src={imageUrl} className="post__image" alt="React" />
			<h4 className="post__text">
				<strong>{username} </strong>
				{caption}
			</h4>
		</div>
	);
};

export default Post;
