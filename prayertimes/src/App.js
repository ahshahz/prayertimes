import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';




const onChange = async values =>{
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  
 
}
const validate = values => {
  console.log("values ", values);

  const errors = {};
  if (!values.latitude) {
    errors.latitude = 'Required';
  }
  if (!values.longitude) {
    errors.longitude = 'Required';
  }

  return errors;
};

function App() {
  const [dataarr, setDatarr] = useState([]);
  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    const year = new Date().getFullYear(); 
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    const method = 0; 
    const both = false; 
    const time = 1; 
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const url = 'https://www.moonsighting.com/time_json.php?year=' + year + '&tz=' + timezone +'&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&method=' + method + '&both=' + both + '&time=' + time
  
      fetch(url, {
       
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        window.alert(JSON.stringify(values, 0, 2));
        setDatarr(data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    });
  
  };
  useEffect(() => {
    console.log("dataarr ", dataarr);
    //loading here as this does it once
    //second array makes it simulate component did mount
  }, [dataarr]);
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Prayer Chart Time Form
      </Typography>
  
      <Typography paragraph>
        <Link href="https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en">
         How to get Latitude and longitude from Google
        </Link>
        . Enter your desired Latitude and Longitude to get Prayer Times from this {' '}
        <Link href="https://github.com/PrayerTimeResearch/PrayerTimeAPI">
          API
        </Link>{' '}
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ ExampleLatitude: '37.97441011798584' , ExampleLongitude: ' -87.4315543621677' }}
        validate={validate}
        render={({ handleSubmit, onChange, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="latitude"
                    component={TextField}
                    type="text"
                    label="Latitude"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="longitude"
                    component={TextField}
                    type="text"
                    label="longitude"
                    onChange={onChange}

                  />
                </Grid>
               
            
              
            
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}
export default App;