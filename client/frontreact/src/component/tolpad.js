import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { PageContainer } from '@toolpad/core/PageContainer';
import PersonIcon from '@mui/icons-material/Person';
import Newdash from './newdah';
import Orders from './oreders';
import axios from 'axios';
import Users from './user';
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
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
  if(pathname =='/LogOut'){
    console.log('logging out')
    sessionStorage.removeItem('jwt')
    window.location.href = "/"
  }

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
  const [user,setuser]=useState([])
  const navigate=useNavigate()
  
  const allPages=[{
    path:'/dashboard',
    component:<Newdash/>
  },{
    path:'/orders',
    component:<Orders/>
  },
  {
    path: '/users',
    component: <Users/>, // Ensure users is imported and defined
  },


]
  // const [CurrentComponent,setCurrentComponent]=useState(allPages[0].component)
const [currentComponant,setCurrentComponant]= useState(<Newdash/>)
    const [dashNavigate,setdashNavigate]=useState([{
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
      kind: 'divider',
    },
    {
      segment: 'LogOut',
      title: 'LogOut',
      icon: <ExitToAppIcon onClick={()=>{
        console.log('logout')
      }} />
    }
    ])
    const handelLogOut = ()=>{
      sessionStorage.removeItem('jwt');
      navigate('/')
    }
  const router = useDemoRouter('/Dashboard');

// this link for Home
useEffect(()=>{
  const token=sessionStorage.getItem('jwt')
  
 const invaliedToken=async()=>{
  try {
    const res = await axios.get('http://127.0.0.1:5002/api/jwt',{
      headers: {
        'auth':'Bearer '+token
      }
    })
setuser(res.data.user)
// alert(res.data.user)
if(res.data.user.roul==='admin'){
setdashNavigate([
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
    title: 'users',
    icon: <PersonIcon/>,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
      
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    segment: 'LogOut',
    title: 'LogOut',
    onClick:handelLogOut,
    icon: 
      <ExitToAppIcon /> 
     },
  

])
}
  } catch (err) {
    console.log(err.response)
    if(err.response.status===401){
      navigate('/')
    }
  }
 }
 invaliedToken()
 console.log(router)
 setCurrentComponant(allPages.find((page) => page.path === router.pathname)?.component)
// console.log('this is th com',currentComponant)
},[router])



  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={dashNavigate}
      router={router}
      theme={demoTheme}
      
      window={demoWindow}
      
      
    >

      <DashboardLayout>
      <Typography>{user.roul}</Typography>

        <PageContainer>
        {currentComponant}

        </PageContainer>
      {/* <DemoPageContent pathname={router.pathname} /> */}
      </DashboardLayout>


    </AppProvider>
    // preview-end
  );
}

export default DashboardLayoutBasic;