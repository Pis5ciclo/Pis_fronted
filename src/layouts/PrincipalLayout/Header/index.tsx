import {
  Avatar,
  Box,
  Typography,
  alpha,
  lighten,
  styled,
  useTheme
} from '@mui/material';

import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: center;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <Avatar sx={{ width: 60, height: 60 }}>
        <img src="/image/logo-unl.png" alt="Tu imagen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Avatar>
      <Box display="absolute"> 
        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '24px'}}>UNIVERSIDAD NACIONAL DE LOJA</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderUserbox />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
