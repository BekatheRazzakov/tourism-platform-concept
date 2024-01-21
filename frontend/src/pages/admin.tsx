import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectAdminStats } from '@/containers/statistics/statisticsSlice';
import { fetchStatsAdmin } from '@/containers/statistics/statisticsThunk';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/admin.css';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAdminStats);
  const t = useTranslations('admin');

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      if (!user || user.role !== userRoles.admin) {
        routers.push('/').then((r) => r);
      }
    });
    dispatch(setIsLightMode(true));
    dispatch(fetchStatsAdmin());
  }, [dispatch, routers, user]);
  return (
    <>
      <PageLoader />
      <div className="fixed-toolbar"></div>
      <div className="container">
        <div className="admin-cards">
          <div className="admin-card">
            <Link href={`/admin/tours/1`} className="admin-card-body">
              <div className="admin-card-body">
                <h1 className="admin-card-title">{t('tours')}</h1>
                <h3 className="admin-card-info">
                  {t('total tours')}: {state?.toursAll}
                </h3>
                <h4>
                  {t('published')} {t('tours').toLowerCase()}:{' '}
                  {state?.toursPublished}
                </h4>
                <h4>
                  {t('unpublished')} {t('tours').toLowerCase()}:{' '}
                  {state?.toursUnpublished}
                </h4>
              </div>
            </Link>
            <Link href={`/tours/create`} className="btn-create-tour">
              {t('create tour')}
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/guides/1`} className="admin-card-body">
              <h1 className="admin-card-title">{t('guides')}</h1>
              <h3 className="admin-card-info">
                {t('current')} {t('guides').toLowerCase()}: {state?.guidesAll}
              </h3>
              <h4>
                {t('active')} {t('guides').toLowerCase()}:{' '}
                {state?.guidesPublished}
              </h4>
              <h4>
                {t('non active')} {t('guides').toLowerCase()}:{' '}
                {state?.guidesUnpublished}
              </h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/news/1`} className="admin-card-body">
              <h1 className="admin-card-title">{t('news')}</h1>
              <h3 className="admin-card-info">
                {t('total news')}: {state?.newsAll}
              </h3>
              <h4>
                {t('published')} {t('news').toLowerCase()}:{' '}
                {state?.newsPublished}
              </h4>
              <h4>
                {t('unpublished')} {t('news').toLowerCase()}:{' '}
                {state?.newsUnpublished}
              </h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/allUsers/1`} className="admin-card-body">
              <h1 className="admin-card-title">{t('users')}</h1>
              <h3 className="admin-card-info">
                {t('total users')}: {state?.users}
              </h3>
              <h4>
                {t('active moderators')}: {state?.usersModerators}
              </h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/partners/all`} className="admin-card-body">
              <h1 className="admin-card-title">{t('partners')}</h1>
              <h3 className="admin-card-info">
                {t('current')} {t('partners').toLowerCase()}:{' '}
                {state?.partnersAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/partnerOrders/1`} className="admin-card-body">
              <h1 className="admin-card-title">{t('partner orders')}</h1>
              <h3 className="admin-card-info">
                {t('total partner orders')}: {state?.partnerOrdersAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/employees/all`} className="admin-card-body">
              <h1 className="admin-card-title">{t('employees')}</h1>
              <h3 className="admin-card-info">
                {t('employees')}: {state?.employeeAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card admin-card-not-link">
            <div className="admin-card-body">
              <h1 className="admin-card-title">{t('orders')}</h1>
              <h3 className="admin-card-info">
                {t('total orders')}: {state?.ordersAll}
              </h3>
              <h4>
                {t('booked')}: {state?.ordersBooked}
              </h4>
              <h4>
                {t('being considered')}: {state?.ordersConsiders}
              </h4>
              <h4>
                {t('approved orders')}: {state?.ordersApproved}
              </h4>
            </div>
          </div>
          <div className="admin-card">
            <Link href={`/admin/guideOrders/1`} className="admin-card-body">
              <h1 className="admin-card-title">{t('guide orders')}</h1>
              <h3 className="admin-card-info">
                {t('total guide orders')}: {state?.totalGuideOrders}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
