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
  Box,
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
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';  

const useStyles = makeStyles({

  root: {
    width: '100%',
  },
  container: {
    overflowX: "initial",
  },
});




const validate = values => {
  console.log("values ", values);

  const errors = {};
 /* if (!values.latitude) {
    errors.latitude = 'Required';
  } */
  if(!values.latitude || isNaN(values.latitude) || !/^\d*\.?\d*$/g.test(values.latitude) ){
   console.log(values.latitude);
    errors.latitude = 'Wrong Format for example 37.983933'
  }
  if(!values.longitude || isNaN(values.longitude) || !/^\d*\.?\d*$/g.test(Math.abs(values.longitude))){
    errors.longitude = 'Wrong Format for example -87.596989'
  }
  /*if (!values.longitude) {
    errors.longitude = 'Required';
  } */
  
  return errors;
};

function App() {
  const [dataarr, setDatarr] = useState([]);
  const classes = useStyles(); 
  const [print, setPrint] = useState(true);
  const handlechange =  async values =>{
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    console.log("values in handlechange: ", values); 
  
   
  }
  function printChart() {
    const input = document.getElementById('prayerchart'); 
    //ref: https://morioh.com/p/2580cfbcefd5
    html2canvas(input)
      .then((canvas) =>{
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        console.log("imgHeight ", imgHeight);
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("prayerchart.pdf");  
      })
    
  }
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
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        var actual = day - 1; 
        console.log('Day of year: ' + actual);
         setDatarr(data.times.slice(actual,data.times.length));
      })
      .catch((err) => {
        alert("Prayer times could not be fetched.");
        console.log(err);
      });
    
    },
    function(error) {
     const latitude = values.latitude;
     const longitude = values.longitude; 
     const url = 'https://www.moonsighting.com/time_json.php?year=' + year + '&tz=' + timezone +'&lat=' + latitude + '&lon=' + longitude + '&method=' + method + '&both=' + both + '&time=' + time

     fetch(url, {
       
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      var actual = day - 1; 
      console.log('Day of year: ' + actual);
       setDatarr(data.times.slice(actual,data.times.length));
    })
    .catch((err) => {
      console.log(err);
      alert("Prayer times could not be fetched.");
    });

    }
     );
  
  };
  useEffect(() => {
    console.log("dataarr ", dataarr);
    //loading here as this does it once
    //second array makes it simulate component did mount
     if(dataarr.length > 10){
      setPrint(false); 

     }
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
      
       var now = new Date();
       var start = new Date(now.getFullYear(), 0, 0);
       var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
       var oneDay = 1000 * 60 * 60 * 24;
       var day = Math.floor(diff / oneDay);
       var actual = day - 1; 
       console.log('Day of year: ' + actual);
        setDatarr(data.times.slice(actual,data.times.length));
      })
      .catch((err) => {
        console.log(err);
      });
    
    },
    function(error) {
     alert("Error! No location provided Please Enter Latitude and Longitude on the form ")
    }
    
    
    );
  }, []);
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Prayer Times
      </Typography>
  
      <Typography paragraph>
        To generate prayer times this app needs your latitude and longitude. If you have enabled location tracking this will happen automatically.
        User Location is not stored anywhere on website please consider enabling. 
        Otherwise use the following links: {' '}
        <Link href="https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en">
         How to get Latitude and longitude from Google Maps.
        </Link>
        Or you can use         <Link href="https://www.latlong.net/">
         this.
        </Link>{' '}
         Enter your desired Latitude and Longitude to get Prayer Times from this {' '}
        <Link href="https://github.com/PrayerTimeResearch/PrayerTimeAPI">
          API.
        </Link>{' '}
        Please Note: prayer times will vary depending on your location.  
 
      </Typography>
      <Typography>
        <Box fontWeight="fontWeightBold">
        Disclaimer: Please use caution. This is in active development. </Box> </Typography>
        <Typography> Please report any bugs to ahmedek2786@gmail.com </Typography>

        <Typography> Coming Soon: Ability to print monthly prayer charts </Typography>
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
                    onChange={(event) => handlechange(event)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="longitude"
                    component={TextField}
                    type="text"
                    label="Longitude"
                    onChange={(event) => handlechange(event)}
                  />
                </Grid>
               
            
               {/*disabled = (reset) {submitting || pristine} */}
              {/*disabled = (submit) {submitting}*/}
            
            
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
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={printChart}
                    disabled={print}
                  >
                   Prints 9 Days of Prayers (Only works on laptop/desktop)
                  </Button>
                </Grid>
              </Grid>
            </Paper>
           {/*     <pre>{JSON.stringify(values, 0, 2)}</pre>*/}
           <Paper className={classes.root}>
            <TableContainer id="prayerchart" className={classes.container}>
            <Typography>Data from moonsighting.com and generated by ahmedshahzad.com</Typography>

           <Table stickyHeader   aria-label="sticky table">
             <TableHead>
            
              
               <TableRow>
                 <TableCell>Date</TableCell>
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
                 <TableRow key={row.day}>
                  <TableCell align="right"> {row.day.substring(0,row.day.length - 3)} </TableCell>

                   <TableCell component="th" scope="row">
                     {row.day.substring(row.day.length - 3,row.day.length)}
                   </TableCell>
                   <TableCell align="right">{row.times.fajr}</TableCell>
                   <TableCell align="right">{row.times.sunrise}</TableCell>
                   <TableCell align="right">{row.times.dhuhr}</TableCell>
                   <TableCell align="right">{row.times.asr_h}</TableCell>
                   <TableCell align="right">{row.times.maghrib}</TableCell>
                   <TableCell align="right">{row.times.isha}</TableCell>

                 </TableRow>
               ))}
             </TableBody>
           </Table>

         </TableContainer>
         </Paper>
          </form>
        
        )}
      />
    </div>
  );
}
export default App;