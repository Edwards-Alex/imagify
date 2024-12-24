import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

    const [state, setState] = useState('login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === 'login') {
                const { data } = await axios.post(backendUrl + '/api/user/login',
                    { email, password });
                if (data.success) {
                    //store token and user in AppContext
                    setToken(data.token);
                    setUser(data.user);
                    //store token in local storage
                    localStorage.setItem('token', data.token);
                    //login success hidden login form
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register',
                    { name, email, password });
                if (data.success) {
                    //store token and user in AppContext
                    setToken(data.token);
                    setUser(data.user);
                    //store token in local storage
                    localStorage.setItem('token', data.token);
                    //login success hidden login form
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {

        //page can't scrolling while this module mounted in App.jsx

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        //page will reset scrolling when this module unmounted

        return () => {
            document.body.style.overflow = originalOverflow;
        }
    }, []);

    return (
        <div className='fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm
         bg-black/30 flex justify-center items-center'>

            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1
                    className='uppercase font-medium text-center text-2xl text-neutral-700'>
                    {state}
                </h1>
                <p className='text-sm'>Welcome back! Place sign in to continue</p>

                {state !== 'login' && <div className='border px-5 pl-3 py-2  flex items-center gap-1 rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" width={30} />
                    <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Full Name' required />
                </div>}

                <div className='border px-5 py-2  flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" />
                    <input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email id' required />
                </div>

                <div className='border px-5 py-2  flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

                <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
                    {state === 'login' ? 'login' : 'create account'}
                </button>

                {state === 'login' ? <p className='mt-5 text-center'>Don't have an account?
                    <span className='text-blue-600 cursor-pointer' onClick={() => setState('sign up')}> Sign up</span>
                </p>
                    :
                    <p className='mt-2 text-center'>Already have an account?
                        <span className='text-blue-600 cursor-pointer' onClick={() => setState('login')}> Login</span>
                    </p>}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
            </motion.form>

        </div>
    )
}

export default Login
