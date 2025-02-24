import * as React from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon

interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? 0 : '8px', // Remove border radius in full screen
          backgroundColor: '#f5f5f5', // Light background color
        },
      }}
    >
      <DialogContent
        sx={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: 690
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light hover effect
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Search Input */}
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search Products"
          type="text"
          fullWidth
          variant="outlined"
          placeholder="Type to search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" /> {/* Search icon */}
              </InputAdornment>
            ),
            sx: {
              borderRadius: '24px', // Rounded input field
              backgroundColor: 'background.paper', // White background
            },
          }}
          sx={{
            maxWidth: '600px', // Limit width for better readability
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export { ResponsiveDialog };