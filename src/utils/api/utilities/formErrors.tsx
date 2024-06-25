import Typography from '@mui/material/Typography';
const renderMessage = ({ errors, fieldName }) => {
    if (errors[fieldName]) {
        return (
            <Typography variant="caption" style={{ fontSize: '0.8rem', textTransform: 'lowercase' }} color="error">
                {errors[fieldName].charAt(0).toUpperCase() + errors[fieldName].slice(1)}
            </Typography>
        );
    }
    return null;
};
export {
    renderMessage,
};