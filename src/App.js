import './App.css';
import React, {
	useState,
	useEffect,
} from 'react';
import Post from './Post.js';
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@material-ui/core';

import ImageUpload from './ImageUpload';
const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#fafafa',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function App() {
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignin, setOpenSignin] =
		useState(false);
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		db.collection('posts').onSnapshot(
			snapshot => {
				setPosts(
					snapshot.docs.map(doc => ({
						id: doc.id,
						post: doc.data(),
					}))
				);
			}
		);
		// onSnapshot(collection(db, "posts"), (snapshot) => {
		//   setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
		// });
	}, []);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(
			authUser => {
				if (authUser) {
					// user login....
					console.log(authUser);
					setUser(authUser);
					if (authUser.displayName) {
						// dont update username
					} else {
						// iff wwe just create someone...
						return authUser.updateProfile({
							displayName: username,
						});
					}
				} else {
					// user log out
					setUser(null);
				}
			}
		);
		return () => {
			unsubscribe();
		};
	}, [user, username]);
	const signUp = e => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(
				email,
				password
			)
			.then(authUser => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch(err => {
				alert(err.message);
			});
	};
	const signIn = e => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => {
				alert(err.message);
			});
	};
	return (
		<div className='app'>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<center>
						<img
							className='app__headerImage'
							src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
							alt=''
						/>
					</center>
					<form action='' className='app__signup'>
						<Input
							placeholder='username'
							type='text'
							value={username}
							onChange={e =>
								setUsername(e.target.value)
							}
						/>
						<Input
							placeholder='email'
							type='email'
							value={email}
							onChange={e =>
								setEmail(e.target.value)
							}
						/>
						<Input
							placeholder='password'
							type='password'
							value={password}
							onChange={e =>
								setPassword(e.target.value)
							}
						/>
						<button
							type='submit'
							onClick={signUp}
						>
							Sign up
						</button>
					</form>
				</Box>
			</Modal>
			<Modal
				open={openSignin}
				onClose={() => setOpenSignin(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<center>
						<img
							className='app__headerImage'
							src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
							alt=''
						/>
					</center>
					<form action='' className='app__signup'>
						<Input
							placeholder='email'
							type='email'
							value={email}
							onChange={e =>
								setEmail(e.target.value)
							}
						/>
						<Input
							placeholder='password'
							type='password'
							value={password}
							onChange={e =>
								setPassword(e.target.value)
							}
						/>
						<button
							type='submit'
							onClick={signIn}
						>
							Sign in
						</button>
					</form>
				</Box>
			</Modal>
			<div className='app__header'>
				<div className='header__container'>
					<img
						className='app__headerImage'
						src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
						alt=''
					/>
					{user ? (
						<Button
							onClick={() => auth.signOut()}
						>
							Logout
						</Button>
					) : (
						<div className=''>
							<Button onClick={handleOpen}>
								Sign up
							</Button>
							<Button
								onClick={() =>
									setOpenSignin(true)
								}
							>
								Sign in
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className='container'>
				{user ? (
					<ImageUpload
						username={user.displayName}
					/>
				) : (
					<h3>
						Sorry you need to login to upload
					</h3>
				)}
				<div className='app__posts'>
					<div className='app__postsLeft'>
						{posts.map(({ id, post }) => (
							<Post
								key={id}
								postId={id}
								user={user.displayName}
								username={post.username}
								caption={post.caption}
								imageUrl={post.imageUrl}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
