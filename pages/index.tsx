import { Container, Grid, styled } from '@mui/material';

import Footer from '@/components/Footer';
import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import PrincipalLayout from '@/layouts/PrincipalLayout';

function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Monitoreo de agua y aire</title>
      </Head>
      <PageTitleWrapper>
        {/* <PageWelcomeUser userName={userName} /> */}
      </PageTitleWrapper>
      <Container maxWidth="lg" >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          style={{ marginRight: '300vh' }}
        >
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <PrincipalLayout>{page}</PrincipalLayout>;

export default DashboardCrypto;
