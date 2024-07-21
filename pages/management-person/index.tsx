import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
import Head from 'next/head';
import PageHeader from '@/content/Management/Person/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Person } from '@/models/person';
import SidebarLayout from '@/layouts/SidebarLayout';
import TablePerson from '@/content/Management/Person/TablePerson';
import api from '@/utils/api/api';
import { useRouter } from 'next/router';

function ApplicationsTransactions() {

    const [person, setPerson] = useState<Person[]>([]);
    const router = useRouter();
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
    const fetchPersons = async () => {
        const persons = await api.listPerson();
        setPerson(persons);
    };

    const handleAddPerson = async () => {
        await fetchPersons();
    };

    React.useEffect(() => {
        fetchPersons();
    }, []);
    return (
        <>
            <Head>
                <link rel="icon" href="/image/logo-unl.png" />
                <title>Gestión usuarios</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader onAddPerson={handleAddPerson} userName={userName}/>
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
                        <TablePerson person={person} setPerson={setPerson} />
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