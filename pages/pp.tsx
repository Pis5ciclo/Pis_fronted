import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  styled
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';
import Head from 'next/head';
import Hero from 'src/content/Overview/Hero';
import Link from 'src/components/Link';
import Logo from 'src/components/LogoSign';
import type { ReactElement } from 'react';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>UNL</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Box mx={1}
              sx={{
                width: 47 ,
                margin: 'auto',
                mt: -1
              }}>
            <Logo />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  sx={{ ml: 2, backgroundColor: 'skyblue'}}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  component={Link}
                  href="/singup"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Registrarse
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
