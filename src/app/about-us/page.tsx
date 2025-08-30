// pages/aboutus.tsx
import { Box, Container, Grid, Typography, Card, CardContent, Avatar, Button } from "@mui/material";
import type { NextPage } from "next";

// Team members example data - swap with your own
const team = [
  { name: "Riya S.", role: "Lead Developer", img: "/riya.jpg" },
  { name: "Vikram P.", role: "UI/UX Designer", img: "/vikram.jpg" },
  { name: "Priya M.", role: "Marketing Head", img: "/priya.jpg" },
];

const Aboutus: NextPage = () => (
  <Container maxWidth="lg">
    {/* Hero Section */}
    <Box sx={{ textAlign: "center", py: 8, bgcolor: "#f5f7fa", borderRadius: 4, mb: 6 }}>
      <Typography variant="h2" fontWeight="bold" color="primary">
        About Modern Web
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
        Creating high-performance, user-first web solutions for brands with Next.js & Material UI
      </Typography>
    </Box>

    {/* Company Story Section */}
    <Card sx={{ mb: 6, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" color="secondary" fontWeight="medium" gutterBottom>
          Our Story
        </Typography>
        <Typography color="text.secondary">
          Modern Web began with a passion for technology and a dedication to delivering exceptional digital experiences.
          From e-commerce platforms to business sites, our mission is always to design with detail and deliver with delicacy.
          We believe in building products that help brands thrive in the online world.
        </Typography>
      </CardContent>
    </Card>

    {/* Features Section */}
    <Typography variant="h4" sx={{ mb: 3 }} color="primary">
      Why Choose Us
    </Typography>
    <Grid container spacing={4} mb={8}>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Passion for Design</Typography>
            <Typography color="text.secondary">
              We combine design aesthetics with functional detail, ensuring every site is visually stunning and user-friendly.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Cutting-Edge Technology</Typography>
            <Typography color="text.secondary">
              Leveraging Next.js, Material UI, and TypeScript for robust, scalable, and performance-driven applications.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Client Success Focus</Typography>
            <Typography color="text.secondary">
              Our goal: your business growth. We build digital products that help our clients stand out and succeed.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Team Section */}
    <Typography variant="h4" sx={{ mb: 3 }} color="primary">
      Meet the Team
    </Typography>
    <Grid container spacing={4} mb={8}>
      {team.map((member) => (
        <Grid item xs={12} sm={4} key={member.name}>
          <Card sx={{ textAlign: "center", py: 3, boxShadow: 2 }}>
            <Avatar src={member.img} alt={member.name} sx={{ width: 80, height: 80, margin: "0 auto 16px" }} />
            <Typography variant="h6">{member.name}</Typography>
            <Typography color="text.secondary">{member.role}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Call to Action Section */}
    <Box sx={{ textAlign: "center", py: 4, mb: 6, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" color="secondary" mb={2}>Want to collaborate?</Typography>
      <Button variant="contained" color="primary">Contact Us</Button>
    </Box>
  </Container>
);

export default Aboutus;
