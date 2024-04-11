'use client'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice, setGData, setImage } from "./authSlice"
import Loader from "@/app/components/Loader"
import authService from "@/app/appwrite/auth"
import service from '@/app/appwrite/service';

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
            throw new Error('Failed to fetch from google');
          }
          if(response.ok){
          const userData = await response.json();
          if (userData && userData.photos && userData.photos.length > 0 && userData.photos[0].url) {
            const image = userData.photos[0].url;
            dispatch(setImage({ image }));
          }
        }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const getNormalUser = useCallback(async () => {
    try {
      let data = await authService.getCurrentUser();
      if (data) {
        if (data.emailVerification) {
          const {$id} = data
          const {documents} = await service.getUserById(String($id))
          if(!documents.length){
              const res = await service.createUser(data)
              data = res  
          }
         else{
           data = documents[0]
          }
          dispatch(loginSlice({ data }));
        }
      } else {
        dispatch(logoutSlice());
        authService.logoutAccount();
      }
    } catch (error) {
      dispatch(logoutSlice());
      console.log('Error getting user data:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getNormalUser();
  }, [getNormalUser]);

  return (
    <>
      { !loading ? (
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
