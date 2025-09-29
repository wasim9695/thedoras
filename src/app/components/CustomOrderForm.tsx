'use client';

import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  Typography,
  Box,
  IconButton
} from "@mui/material";


type OrderFormData = {
  size: string;
  color: string;
  customText: string;
  quantity: number;
  notes?: string;
};

const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White", "Red", "Blue"];

export default function CustomOrderForm() {
  const [open, setOpen] = useState(true);

  if (!open) return null; // Hide form when closed

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 0,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        position: "relative",
      }}
    >
      {/* Close Icon */}
      

      <Typography variant="h6" mb={2}>
        Custom Order
      </Typography>

      <form>
        {/* Size */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="size-label">Size</InputLabel>
          <Select labelId="size-label" defaultValue="">
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Color */}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Color</FormLabel>
          <RadioGroup row>
            {colors.map((color) => (
              <FormControlLabel
                key={color}
                value={color}
                control={<Radio />}
                label={color}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Custom Text */}
        <TextField fullWidth label="Custom Text" margin="normal" />

        {/* Quantity */}
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          margin="normal"
        />

        {/* Notes */}
        <TextField
          fullWidth
          label="Additional Notes"
          margin="normal"
          multiline
          rows={4}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#000000" }}
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Order
        </Button>
      </form>
    </Box>
  );
}
