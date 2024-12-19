"use client"
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
 
}));
const Footer=()=> {
  return (
    <Grid container spacing={2} sx={{padding: 5}}>
      {/* Footer Sections */}
      <Grid item xs={3}>
      <Typography className='headingProduct' variant="h5">New 1</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography className='headingProduct' variant="h5">New 2</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography className='headingProduct' variant="h5">New 3</Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography className='headingProduct' variant="h5">New 4</Typography>
      </Grid>

      {/* Copyright */}
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}
export default Footer
