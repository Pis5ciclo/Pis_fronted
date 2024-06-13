import { Container, Grid } from '@mui/material';

import Footer from '@/components/Footer';
import Head from 'next/head';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import TablePerson from '@/content/Management/Person/TablePerson';

function ApplicationsTransactions() {
    return (
        <>
        <Head>
            <title>Gestion usuarios</title>
        </Head>
        <PageTitleWrapper>
            <PageHeader />
        </PageTitleWrapper>
        <Container maxWidth="lg">
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            >
            <Grid item xs={12}>
                <TablePerson />
            </Grid>
            </Grid>
        </Container>
        <Footer />
        </>
    );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
