import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
import Head from 'next/head';
import PageHeader from '@/content/Management/Sensor/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Sensor } from '@/models/sensor';
import SidebarLayout from '@/layouts/SidebarLayout';
import TableSensor from '@/content/Management/Sensor/TableSensor';
import api from '@/utils/api/api';
import { useRouter } from 'next/router';

function ApplicationsTransactions() {
    const router = useRouter();
    const [sensor, setSensor] = useState<Sensor[]>([]);
    const { name } = router.query;
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const storedName = Cookies.get('user');
        if (typeof name === 'string') {
            setUserName(name);
            Cookies.set('user', name);
        } else if (storedName) {
            setUserName(storedName); 
        }
    }, [name]);
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
                <title>Gestion sensores</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader onAddSensor={handleAddSensor} userName={userName} />
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
                        <TableSensor sensor={sensor} setSensor={setSensor} />
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