import {
  Box,
  styled,
} from '@mui/material';

import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

function Logo() {
  return (
      <LogoWrapper href="#">
          <LogoSignWrapper>
            <>UUUUUUUUU</>
          </LogoSignWrapper>
      </LogoWrapper>
  );
}

export default Logo;
