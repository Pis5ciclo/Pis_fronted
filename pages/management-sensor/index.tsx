import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { Sensor } from '@/models/sensor';
import PageHeader from '@/content/Management/Sensor/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import TableSensor from '@/content/Management/Sensor/TableSensor';
import api from '@/utils/api/api';

function ApplicationsTransactions() {
    const [sensor, setSensor] = useState<Sensor[]>([]);
    const fetchSensors = async () => {
        const sensors = await api.listSensor();
        setSensor(sensors);
    };
    useEffect(() => {
        fetchSensors();  
    }, []);

    const handleAddSensor = async () => {
        await fetchSensors();
    };
    return (
        <>
            <Head>
                <link rel="icon" href="/image/logo-unl.png" />
                <title>Gestión sensores</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader onAddSensor={handleAddSensor} />
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
                        <TableSensor sensor={sensor} setSensor={setSensor}/>
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
