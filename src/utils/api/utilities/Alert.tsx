import { Alert, Box } from '@mui/material';

import React from 'react';

interface AlertMessageProps {
    alert: {
        message: string;
        severity: 'success' | 'error';
        open: boolean;
    };
}

const AlertMessage: React.FC<AlertMessageProps> = ({ alert }) => {
    return (
        <Box mt={2}>
            {alert.open && (
                <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
        </Box>
    );
};

export default AlertMessage;
