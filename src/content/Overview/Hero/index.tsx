import {
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Universidad Nacional de Loja
          </TypographyH1>
          <Grid container spacing={3} mt={5}>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
