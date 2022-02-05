import React, {
	useState,
	useEffect,
} from 'react';
import './Post.css';
import { db } from './firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
function Post({
	postId,
	user,
	username,
	caption,
	imageUrl,
}) {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');
	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.onSnapshot(snapshot => {
					setComments(
						snapshot.docs.map(doc => doc.data())
					);
					console.log(snapshot);
				});
			console.log(comments);
		}
		return () => unsubscribe();
	}, [postId]);
	const PostComment = e => {
		e.preventDefault();
		if (comment) {
			db.collection('posts')
				.doc(postId)
				.collection('comments')
				.add({
					// timestamp:
					// 	db.FieldValue.serverTimestamp(),
					text: comment,
					username: user,
				});
			setComment('');
		} else console.log('Bạn chưa nhập comment');
	};
	return (
		<div className='post'>
			<div class='post__header'>
				<Avatar
					className='post__avatar'
					alt={username}
					src=''
				/>
				<h3>{username}</h3>
			</div>
			{/* header->avater+username */}
			<h4 className='post__text'>{caption}</h4>
			<img
				className='post__image'
				src={imageUrl}
				alt={username}
			/>
			{/* image */}
			{/* username+caption */}
			{comments.map(abd => (
				<div className='post__comment'>
					<strong>{abd.username}:</strong>
					<span>{abd.text}</span>
				</div>
			))}
			<form className='post__commentUp'>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-end',
						width: 500,
						maxWidth: '100%',
						padding: '20px',
					}}
				>
					<AccountCircle
						sx={{
							color: 'action.active',
							mr: 1,
							my: 0.5,
						}}
					/>
					<TextField
						id='fullWidth'
						label='Enter your comment...'
						variant='standard'
						fullWidth
						onChange={e => {
							setComment(e.target.value);
							console.log(e.target.value);
						}}
					/>
				</Box>

				<Button onClick={PostComment}>Gửi</Button>
			</form>
		</div>
	);
}

export default Post;
