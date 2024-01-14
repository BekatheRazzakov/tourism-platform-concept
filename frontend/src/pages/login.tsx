import React, { useEffect } from 'react';
import SignInForm from '@/components/Forms/SignInForm/SignInForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAlert,
  resetSignInError,
  selectSignInError,
} from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectSignInError);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (error) {
      dispatch(addAlert({ message: error.error, type: 'error' }));
      dispatch(resetSignInError());
    }
  }, [error, dispatch]);

  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default Login;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
