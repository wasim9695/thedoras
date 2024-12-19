import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField, InputAdornment } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

interface ResponsiveDialogProps {
    open: boolean;
    onClose: () => void;
  }
  
  const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ open, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
    
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      className='mainDigialogBox'
    >
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search Products"
          type="text"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               
              </InputAdornment>
            ),
          }}
        />
        <CloseIcon onClick={onClose}/>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose} autoFocus>
          Search
        </Button>
      </DialogActions> */}
    </Dialog>
    </React.Fragment>
  );
}
export {ResponsiveDialog};