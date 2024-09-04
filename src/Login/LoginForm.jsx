// src/components/LoginForm.js
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Initial form values
const initialValues = {
  email: '',
  password: '',
};

// Login form component
const LoginForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    // Simulate an API call
    setTimeout(() => {
      alert('Login successful');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default LoginForm;
