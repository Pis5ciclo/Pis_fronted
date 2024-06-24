import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Cookies from "js-cookie";
import Footer from '@/components/Footer';
import Head from 'next/head';
import InfoSensores from '@/content/Dashboards/Crypto/InfoSensores';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';

function DashboardCrypto() {
  const router = useRouter();
  const { name } = router.query;
  const token = Cookies.get('token_person'); 
  const [userName, setUserName] = useState('');
  useEffect(() => {
    if (token && typeof name === 'string') {
      setUserName(name);
    }
  }, [name]);
  return (
    <>
      <Head>
        <title>Página Principal</title>
      </Head>
        <PageTitleWrapper>
          <PageWelcomeUser userName={userName} />
        </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <InfoSensores />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
