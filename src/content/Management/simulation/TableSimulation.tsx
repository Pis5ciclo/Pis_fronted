import {
    Card,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const ContentTableSimulation = () => {
    return (
        // <Card sx={{ width: '100%', overflowX: 'auto' }}>
            // <Divider />
            <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                        <TableCell style={{ width: '14.28%' }}>Sensor</TableCell>
                            <TableCell style={{ width: '14.28%' }}>ip</TableCell>
                            <TableCell style={{ width: '14.28%' }}>latitud</TableCell>
                            <TableCell style={{ width: '14.28%' }}>longitud</TableCell>
                            <TableCell style={{ width: '14.28%' }}>Tipo</TableCell>
                            <TableCell style={{ width: '14.28%' }}>Dato</TableCell>
                            <TableCell style={{ width: '14.28%' }}>Hora</TableCell>
                            <TableCell style={{ width: '14.28%' }}>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        // </Card>
    );
};

export default ContentTableSimulation;
