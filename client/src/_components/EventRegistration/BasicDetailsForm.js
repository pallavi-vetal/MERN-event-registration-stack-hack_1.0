import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
class BasicDetailsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            file: [{
                source: '',
                options: {
                    type: ''
                }
            }]
        };
    }
    
    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    render() { 
        return ( 
            <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Basic Details
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  autoComplete="fullName"
                  onChange={this.props.onChange}
                />
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Mobile No"
                  fullWidth
                  autoComplete="mobile"
                  onChange={this.props.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email ID"
                  fullWidth
                  autoComplete="email"
                  onChange={this.props.onChange}
                />
               
              </Grid>
             
              <Grid item xs={12}>
              <br></br>
              <FormLabel variant="h5" >
              Upload ID Card
            </FormLabel>
            <br></br>
              <FilePond ref={ref => this.pond = ref}
                          
                          allowMultiple={false}
                          maxFiles={3}
                          required
                          name={"file"}
                          id="file"
                          server="http://localhost:3007/uploadImage"
                          oninit={() => this.handleInit() }
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  file: fileItems.map(fileItem => fileItem.file)
                              });
                          }}
                          
                          >
                              
                </FilePond>
                <TextField
                  disabled
                  id="fileName"
                  name="fileName"
                  
                  fullWidth
                  value={this.state.file[0].name}
                  autoComplete="fileName"
                  
                />
            </Grid>
            </Grid>
          </React.Fragment>
         );
    }
}
 
export default BasicDetailsForm;
