import { Container, Grid } from '@mui/material';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import Footer from '@/components/Footer';
import Head from 'next/head';
import InfoDataSensor from '@/content/Dashboards/Crypto/InfoDataSensor';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import SidebarLayout from '@/layouts/SidebarLayout';
import { useRouter } from 'next/router';

function DashboardCrypto() {
  const router = useRouter();
  const { query } = router;
  const userName = query.name || '';
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
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
          <Grid item xs={12}>
            <InfoDataSensor />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;