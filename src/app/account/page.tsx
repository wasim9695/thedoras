"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getPlaceorders } from '../api/products/productsAll';

// --- Types updated to match your JSON ---
interface Product {
  name: string;
  totalPrice: number;
}

interface OrderData {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  products: Product[];
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  component: string;
}

const accountMenuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, component: 'DashboardContent' },
  { text: 'Orders', icon: <ShoppingBagIcon />, component: 'OrdersContent' },
  { text: 'Account Details', icon: <PersonIcon />, component: 'AccountDetailsContent' },
  { text: 'Change Password', icon: <LockIcon />, component: 'ChangePasswordContent' },
  { text: 'Logout', icon: <LogoutIcon />, component: 'LogoutContent' },
];

// --- Sub-Components ---

function DashboardContent() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>Dashboard</Typography>
      <Typography variant="body1">
        From your account dashboard, you can view your <Link href="#">recent orders</Link>, 
        manage your <Link href="#">account details</Link>, and <Link href="#">change your password</Link>.
      </Typography>
    </>
  );
}

function OrdersContent() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getPlaceorders();
        const result = response;
        console.log("Orders fetched:", result);
        if (result.status === 1) {
          setOrders(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch orders from server");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>Orders</Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>#{row.orderId}</Typography>
                </TableCell>
                <TableCell>{new Date(row.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box component="span" sx={{ 
                    textTransform: 'capitalize', 
                    color: row.orderStatus === 'pending' ? 'orange' : 'green' 
                  }}>
                    {row.orderStatus}
                  </Box>
                </TableCell>
                <TableCell>
                  ₹{row.totalAmount.toLocaleString()} for {row.products.length} items
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}>
                    view
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function AccountDetailsContent() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>Account Details</Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="First Name *" variant="outlined" margin="normal" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name *" variant="outlined" margin="normal" /></Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Display Name *" variant="outlined" margin="normal" helperText="How your name appears in the account and reviews" />
          </Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Phone/Mobile *" variant="outlined" margin="normal" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Email *" variant="outlined" margin="normal" type="email" /></Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Gender</Typography>
            <RadioGroup row name="gender">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}>Save</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function ChangePasswordContent() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>Change Password</Typography>
      <Box component="form" sx={{ maxWidth: 400 }}>
        <TextField
          fullWidth label="Old Password" type={showOld ? 'text' : 'password'} margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowOld(!showOld)} edge="end">
                  {showOld ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth label="New Password" type={showNew ? 'text' : 'password'} margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                  {showNew ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ backgroundColor: 'black', mt: 3 }}>Change Password</Button>
      </Box>
    </>
  );
}

// --- Main Layout ---

export default function MyAccountLayout() {
  const [activeItem, setActiveItem] = useState<string>('DashboardContent');

  const renderContent = () => {
    switch (activeItem) {
      case 'DashboardContent': return <DashboardContent />;
      case 'OrdersContent': return <OrdersContent />;
      case 'AccountDetailsContent': return <AccountDetailsContent />;
      case 'ChangePasswordContent': return <ChangePasswordContent />;
      case 'LogoutContent': return <Typography variant="h5">Logging you out...</Typography>;
      default: return <DashboardContent />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
            <List component="nav">
              {accountMenuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  selected={activeItem === item.component}
                  onClick={() => setActiveItem(item.component)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee' }}>
            {renderContent()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}