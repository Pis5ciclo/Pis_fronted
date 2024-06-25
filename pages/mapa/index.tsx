import { Container, Grid } from '@mui/material';

import Footer from '@/components/Footer';
import Head from 'next/head';
import MapUbication from '@/components/Map/MapUbication';
import React from 'react';
import SidebarLayout from '@/layouts/SidebarLayout';

function Mapa() {
    return (
        <>
            <Head>
                <link rel="icon" href="/image/logo-unl.png" />
                <title>Mapa de sensores</title>
            </Head>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                    mt={1}
                >
                    <Grid item xs={12}>
                        <MapUbication />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

Mapa.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default Mapa;
