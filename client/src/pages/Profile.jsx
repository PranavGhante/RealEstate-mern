import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [formData, setFormData] = useState({});
    const [fileUploadError, setFileUploadError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);
    // console.log(formData)
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL })
                })
            }
        );
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            // console.log(data);
            if (data.success == false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutFailure(data.message));
            }
            dispatch(signOutSuccess(data));
        } catch (error) {
            dispatch(signOutFailure(data.message));
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
                <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                <p className="text-center text-sm">
                    {fileUploadError ?
                        (<span className='text-red-700'>Error Image Upload</span>) :
                        filePerc > 0 && filePerc < 100 ? (
                            <span className='text-slate-700'> {`Uploading ${filePerc}%`}</span>
                        ) : filePerc === 100 ? (
                            <span className="text-green-700">Image Successfully Uploaded!</span>
                        ) : ('')
                    }
                </p >
                <input type="text" placeholder='username' defaultValue={currentUser.username} onChange={handleChange} className='border p-3 rounded-lg' id="username" />
                <input type="text" placeholder='email' defaultValue={currentUser.email} onChange={handleChange} className='border p-3 rounded-lg' id="email" />
                <input type="password" placeholder='password' onChange={handleChange} className='border p-3 rounded-lg' id="password" />
                <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity90 h-10'>{loading ? 'Loading....' : 'Update'}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
            </div>

            {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p> */}
        </div>
    )
}
