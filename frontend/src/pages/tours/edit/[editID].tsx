import React, { useEffect } from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useParams } from 'next/navigation';
import { fetchTour } from '@/containers/tours/toursThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import TourForm from '@/components/Forms/TourForm/TourForm';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';

const EditTour: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchTour(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <div className="container sign-up-page">
      <PageLoader />
      <TourForm isEdit idTour={tour?._id} />
    </div>
  );
};

export default EditTour;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
