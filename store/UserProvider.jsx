'use client'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice, setGData } from "./authSlice"
import Loader from "@/app/components/Loader"
import authService from "@/app/appwrite/auth"
import Image from 'next/image';

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await authService.getSesssion();
      if (data) {
        try {
          const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses,phoneNumbers',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${data?.providerAccessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          dispatch(setGData({ userData }));
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
      setError('Cannot fetch data from the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getNormalUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser();
      if (data) {
        if (data.emailVerification) {
          dispatch(loginSlice({ data }));
        }
      } else {
        dispatch(logoutSlice());
        authService.logoutAccount();
      }
    } catch (error) {
      console.log('Error getting user data:', error);
      setError('Cannot fetch data from the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getNormalUser();
  }, [getNormalUser]);

  return (
    <>
      {error ? (
        <div className="w-full h-screen flex-col flex items-center justify-center">
          <div className=' w-60 h-60'>
            <Image style={{width:"100%",height:"100%", objectFit:"contain"}} src='/serverdown.svg' width={500} height={500}/>
          </div>
          <p className='mt-8 text-gray-700 font-bold text-xl text-center'>{error}</p>
        </div>
      ) : !loading ? (
        <div>{children}</div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader className="h-[30rem]" />
        </div>
      )}
    </>
  );
};

export default UserProvider;
