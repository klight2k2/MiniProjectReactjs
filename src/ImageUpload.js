import React, { useState } from 'react';
import { db, storage } from './firebase';
import Button from '@mui/material/Button';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
function ImageUpload({ username }) {
	const [caption, setCaption] = useState('');
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const handleChange = e => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
		console.log(e.target.files[0]);
	};
	const handleUpLoad = () => {
		const uploadTask = storage
			.ref(`image/${image.name}`)
			.put(image);
		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred /
						snapshot.totalBytes) *
						100
				);
				setProgress(progress);
			},
			error => {
				console.log(error);
				alert(error.message);
			},
			() => {
				storage
					.ref('image')
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						db.collection('posts').add({
							timestamp:
								firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: username,
						});
					});
				setProgress(0);
				setCaption('');
				setImage(null);
			}
		);
	};
	return (
		<div className='app__upload'>
			<progress value={progress} max='100' />
			<input
				type='text'
				placeholder='enter a caption....'
				onChange={e => setCaption(e.target.value)}
			/>
			<input
				type='file'
				onChange={handleChange}
			/>
			<Button onClick={handleUpLoad}>
				Upload
			</Button>
		</div>
	);
}

export default ImageUpload;
