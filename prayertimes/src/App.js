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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



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
     //   window.alert(JSON.stringify(values, 0, 2));
        setDatarr(data.times);
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
  useEffect(() => {
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
       // window.alert(JSON.stringify(values, 0, 2));
        setDatarr(data.times);
      })
      .catch((err) => {
        console.log(err);
      });
    
    });
  }, []);
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h2" align="center" component="h1" gutterBottom>
      Page Under Construction Use With Caution 
      </Typography>
  
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Prayer Chart Time Form
      </Typography>
  
      <Typography paragraph>
        <Link href="https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en">
         How to get Latitude and longitude from Google
        </Link>
        . Enter your desired Latitude and Longitude to get Prayer Times from this {' '}
        <Link href="https://github.com/PrayerTimeResearch/PrayerTimeAPI">
          API.
        </Link>{' '}
        User Location is not stored anywhere on website please consider enabling. 
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
               
            
               {/*disabled = (reset) {submitting || pristine} */}
              {/*disabled = (submit) {submitting}*/}
            
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={true}                   
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={true}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
           {/*     <pre>{JSON.stringify(values, 0, 2)}</pre>*/}
            <TableContainer component={Paper}>
           <Table aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>Day</TableCell>
                 <TableCell align="right">Fajr</TableCell>
                 <TableCell align="right">Sunrise</TableCell>
                 <TableCell align="right">Zhur</TableCell>
                 <TableCell align="right">Asr</TableCell>
                 <TableCell align="right">Maghrib</TableCell>
                 <TableCell align="right">Isha</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {dataarr.map((row) => (
                 <TableRow key={row.times.day}>
                   <TableCell component="th" scope="row">
                     {row.day}
                   </TableCell>
                 
                   <TableCell align="right">{row.times.fajr}</TableCell>
                   <TableCell align="right">{row.times.sunrise}</TableCell>
                   <TableCell align="right">{row.times.dhuhr}</TableCell>
                   <TableCell align="right">{row.times.asr_s}</TableCell>
                   <TableCell align="right">{row.times.maghrib}</TableCell>
                   <TableCell align="right">{row.times.isha}</TableCell>

                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
          </form>
        
        )}
      />
    </div>
  );
}
export default App;