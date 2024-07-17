import ContentTableSimulation from '@/content/Management/DataSensor/TableSimulation';
import { Grid } from '@mui/material';

function InfoDataSensor() {
    return (
        <>
            <Grid container spacing={2}>
                <ContentTableSimulation />
            </Grid>
        </>
    );
}

export default InfoDataSensor;