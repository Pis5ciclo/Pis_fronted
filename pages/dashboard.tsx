import { Container, Grid } from '@mui/material';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
import Footer from '@/components/Footer';
import Head from 'next/head';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import Wallets from '@/content/Dashboards/Crypto/Wallets';
import WatchList from '@/content/Dashboards/Crypto/WatchList';
import { UserProvider } from '@/content/Dashboards/Crypto/UserContext';
function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <UserProvider>
        <PageTitleWrapper>
          <PageWelcomeUser />
        </PageTitleWrapper>
      </UserProvider>
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
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
