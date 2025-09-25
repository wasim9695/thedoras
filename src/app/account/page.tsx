"use client";
// components/MyAccountLayout.js
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
  Button, // For the "view" button in Orders
  TextField, // For form inputs
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton, // For password visibility toggle
  InputAdornment, // For placing icon in TextField
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

// Define the menu items and their corresponding component names
const accountMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, component: 'DashboardContent' },
  { text: 'Orders', icon: <ShoppingBagIcon />, component: 'OrdersContent' },
  { text: 'Account Details', icon: <PersonIcon />, component: 'AccountDetailsContent' },
  { text: 'Change Password', icon: <LockIcon />, component: 'ChangePasswordContent' },
  { text: 'Logout', icon: <LogoutIcon />, component: 'LogoutContent' },
];

// Helper function to render the correct content based on the active item
function renderContent(activeItem: any) {
  switch (activeItem) {
    case 'DashboardContent':
      return <DashboardContent />;
    case 'OrdersContent':
      return <OrdersContent />;
    case 'AccountDetailsContent':
      return <AccountDetailsContent />;
    case 'ChangePasswordContent':
      return <ChangePasswordContent />;
    case 'LogoutContent':
      return <Typography variant="h5">Logging you out...</Typography>;
    default:
      return <DashboardContent />;
  }
}

// 1. Dashboard Content (remains the same)
function DashboardContent() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        From your account dashboard, you can view your <Link href="#">recent orders</Link>, manage your <Link href="#">account details</Link>, and <Link href="#">change your password</Link>.
      </Typography>
    </>
  );
}

// 2. Orders Content (updated to match Image 1)
function OrdersContent() {
  const orders = [
    { order: '3203', date: 'March 18, 2021', status: 'Completed', total: '$16,950.00 for 93 items' },
    { order: '3204', date: 'March 18, 2021', status: 'Completed', total: '$16,950.00 for 93 items' },
  ];

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}> {/* Light grey background for header */}
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Actions</TableCell> {/* Align right for consistency with button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.order}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/orders/${row.order}`}>#{row.order}</Link>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.total}</TableCell>
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

// 3. Account Details Content (new, matching Image 2)
function AccountDetailsContent() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Account Details
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name *" variant="outlined" margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name *" variant="outlined" margin="normal" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Display Name *" variant="outlined" margin="normal" helperText="This will be how your name will be displayed in the account section and in reviews" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone/Mobile *" variant="outlined" margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email *" variant="outlined" margin="normal" type="email" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Gender
            </Typography>
            <RadioGroup row aria-label="gender" name="gender-radio-buttons-group">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' }, color: 'white' }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// 4. Change Password Content (new, matching Image 3)
function ChangePasswordContent() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownOldPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Change Password
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 400 }}> {/* Limit width for better form presentation */}
        <TextField
          fullWidth
          label="Old Password"
          type={showOldPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' }, color: 'white', mt: 3 }}>
          Change Password
        </Button>
      </Box>
    </>
  );
}

// Main Layout Component
export default function MyAccountLayout() {
  const [activeItem, setActiveItem] = useState('DashboardContent'); // Default to Dashboard

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 2 }}>
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
        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          <Paper elevation={0} sx={{ p: 3 }}>
            {renderContent(activeItem)}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}