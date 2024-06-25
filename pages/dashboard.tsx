import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
import Head from 'next/head';
import InfoSensores from '@/content/Dashboards/Crypto/InfoSensores';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';

function DashboardCrypto() {
  const router = useRouter();
  const { name } = router.query;
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const storedName = Cookies.get('user'); // Lee el nombre del usuario de la cookie
    if (typeof name === 'string') {
      setUserName(name);
      Cookies.set('user', name); // Actualiza la cookie si es necesario
    } else if (storedName) {
      setUserName(storedName); // Usa el nombre almacenado si no hay nombre en la URL
    }
  }, [name]);
  return (
    <>
      <Head>
        <link rel="icon" href="/image/logo-unl.png" />
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
