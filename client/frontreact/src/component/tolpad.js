import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { PageContainer } from '@toolpad/core/PageContainer';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const demoTheme = createTheme({
  palette: {
    mode: 'light', // تعيين الوضع إلى الوضع الفاتح (الأبيض)
    background: {
      default: '#ffffff', // تعيين لون الخلفية إلى الأبيض
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [dashNavigate, setDashNavigate] = useState([
  
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
    },
    {
      segment: 'LogOut',
      title: 'LogOut',
      icon: <ExitToAppIcon />,
      onClick: () => handleLogOut(), // ربط handleLogOut هنا
    },
  ]);

  const handleLogOut = () => {
    sessionStorage.removeItem('jwt');
    navigate('/');
  };


  const router = useDemoRouter('/dashboard');

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');

    const invaliedToken = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5003/api/home', {
          headers: {
            Auth: 'Bearer ' + token,
          },
        });

        console.log('User data:', res.data.user);
        setUser(res.data.user);

        if (res.data.roul === 'admin') {
          console.log('User is admin');
          setDashNavigate([
            {
              kind: 'header',
              title: 'Main items',
            },
            {
              segment: 'dashboard',
              title: 'Dashboard',
              icon: <DashboardIcon />,
            },
            {
              segment: 'orders',
              title: 'Orders',
              icon: <ShoppingCartIcon />,
            },
            {
              segment: 'users',
              title: 'Users',
              icon: <PersonIcon />,
            },
            {
              segment: 'LogOut',
              title: 'LogOut',
              icon: <ExitToAppIcon />,
              onClick: () => handleLogOut(), // ربط handleLogOut هنا أيضًا
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);

        if (err.response && err.response.status === 401) {
          navigate('/');
        } else {
          console.error('Unexpected error:', err.message);
        }
      }
    };

    invaliedToken();
  }, [router]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider navigation={dashNavigate} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <Typography>{user.roul}</Typography>
        <PageContainer>
          <DemoPageContent pathname={router.pathname} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;