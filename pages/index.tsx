import { Container, Grid, styled } from '@mui/material';

import Footer from '@/components/Footer';
import Head from 'next/head';
import PrincipalLayout from '@/layouts/PrincipalLayout';
import SimulationPrognostic from '@/content/Dashboards/Crypto/SimulationPrognostic';

const CardSimulation = styled(Container)(
  ({ theme }) => `
  height: ${theme.header.height};
  position:center;
  justify-content: space-between;
  right: 0;
  z-index: 6;
  width: 100%;
  padding: ${theme.spacing(0.5)};
  @media (min-width: ${theme.breakpoints.values.lg}px) {
    left: ${theme.sidebar.width};
    width: auto;
}
`
);
function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Monitoreo de agua y aire</title>
      </Head>
      <Container maxWidth="lg" >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          style={{ marginRight: '300vh' }} 
        >
          <Grid item xs={12}>
            <SimulationPrognostic />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <PrincipalLayout>{page}</PrincipalLayout>;

export default DashboardCrypto;
