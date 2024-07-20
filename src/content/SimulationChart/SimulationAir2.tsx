import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    alpha,
    styled,
    useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { useEffect, useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Chart } from 'src/components/Chart';
import Text from 'src/components/Text';
import axios from 'axios';

const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
        margin: ${theme.spacing(0, 0, 1, -0.5)};
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: ${theme.spacing(1)};
        padding: ${theme.spacing(0.5)};
        border-radius: 60px;
        height: ${theme.spacing(5.5)};
        width: ${theme.spacing(5.5)};
        background: ${theme.palette.mode === 'dark'
            ? theme.colors.alpha.trueWhite[30]
            : alpha(theme.colors.alpha.black[100], 0.07)
        };
    
        img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
        }
    `
);

function SimulationAir2() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const theme = useTheme();
    const [sensorData, setSensorData] = useState([]);
    useEffect(() => {
        const getSensorData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/simulacion/3'); 
                setSensorData(response.data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };
        getSensorData();
    }, [])
    const fetchDataByDate = async () => {
        if (startDate && endDate) {
            try {
                const response = await axios.get('http://localhost:5000/api/simulacion/date/3', {
                    params: {
                        start_date: startDate.toISOString().split('T')[0],
                        end_date: endDate.toISOString().split('T')[0]
                    }
                });
                setSensorData(response.data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        } else {
            alert('Please select both start and end dates');
        }
    };
    const fetchInterpolacion = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/simulacion/interpolate/3')
            setSensorData(response.data);
        } catch (error) {
            console.error('Error interpolating sensor data:', error);
        }
    };
    const formatChartData = (sensorData) => {
        return sensorData.map(data => ({
            x: `${data.date} ${data.hour}`, // Concatena fecha y hora para el eje x
            y: parseFloat(data.data)       // Convierte el dato a número
        }));
    };
    const chartOptions = {
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            zoom: {
                enabled: false
            }
        },
        fill: {
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        colors: [theme.colors.primary.main],
        dataLabels: {
            enabled: false
        },
        theme: {
            mode: theme.palette.mode
        },
        stroke: {
            show: true,
            colors: [theme.colors.primary.main],
            width: 3
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: formatChartData(sensorData).map(item => item.x),
            labels: {
                show: true,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            },
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true
            },
            tickPlacement: 'between'
        },
        yaxis: {
            show: false,
            tickAmount: 5
        },
        grid: {
            show: true,
            borderColor: '#f0f0f0',
            strokeDashArray: 10
        },
        tooltip: {
            x: {
                show: true,
                format: 'dd MMM yyyy HH:mm'
            },
            marker: {
                show: false
            }
        }
    };
    const chart3Data = [
        {
            name: 'Dato',
            data: formatChartData(sensorData).map(item => item.y)
        }
    ];

    return (
        <Grid item md={12} xs={6}>
            <Box
                sx={{
                    p: 3
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha inicio"
                            value={startDate}
                            onChange={newValue => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} sx={{ mr: 2 }} />}
                        />
                        <DatePicker
                            label="Fecha fin"
                            value={endDate}
                            onChange={newValue => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} sx={{ mr: 2 }} />}
                        />
                    </LocalizationProvider>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={fetchDataByDate}>
                                Pronóstico
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={fetchInterpolacion}>
                                Interpolación
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box display="flex" alignItems="center" marginTop={"10px"}>
                    <AvatarWrapper>
                        <img
                            alt="ADA"
                            src="/static/images/placeholders/logo/aire.png"
                        />
                    </AvatarWrapper>
                    <Box>
                        <Typography variant="h4" noWrap>
                            AIRE
                        </Typography>
                    </Box>
                </Box>
                <Typography>
                    <b>Valor normal: </b> <Text color="error"><b>0-400</b></Text>
                </Typography>
                <Typography>
                    <b>Valor contaminado: </b> <Text color="success"><b>400-1000</b></Text>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        pt: 1
                    }}
                >
                </Box>
            </Box>
            <Chart
                options={chartOptions}
                series={chart3Data}
                type="area"
                height={210}
            />
        </Grid>
    );
}

export default SimulationAir2;
