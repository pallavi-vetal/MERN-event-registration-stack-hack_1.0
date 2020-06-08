/*
 * Component is responsible for rendering 1st part of registration form containing basic details of user.
 */
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
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
registerPlugin(FilePondPluginImageExifOrientation,FilePondPluginImageResize, FilePondPluginImagePreview, FilePondPluginFileValidateType);
class BasicDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [{
        source: '',
        options: {
          type: ''
        }
      }],
      imageID: '',
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  render() {
    return (
      <React.Fragment >
        <Typography variant="h6" gutterBottom>
          Basic Details
            </Typography>
        <Grid container spacing={2} xs={12} md={12} lg={12} >
          <br></br>
          <Grid item xs={12}>
            <TextField
              required
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              color="secondary"
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
              color="secondary"
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
              color="secondary"
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
              imageResizeTargetWidth={"200px"}
              allowMultiple={false}
              allowImagePreview={true}
              maxFiles={3}
              required
              name={"file"}
              id="file"
              acceptedFileTypes={['image/png', 'image/jpeg']}
              server={{
                process: {
                  url: '/api/events/uploadImage',
                  onload: (response) => {
                    this.setState({ "imageID": JSON.parse(response).id })
                    this.props.onImageUpload(JSON.parse(response).id);
                  },

                }
              }}
              oninit={() => this.handleInit()}
              onupdatefiles={(fileItems) => {
                // Set current file objects to this.state
                this.setState({
                  file: fileItems.map(fileItem => fileItem.file)
                });

              }}
              onloadfiles={(file) => {
                console.log(file);
              }}
            >
            </FilePond>
            <TextField
              disabled
              id="fileName"
              name="fileName"
              fullWidth
              value={this.state.file.sources}
              autoComplete="fileName"

            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default BasicDetailsForm;
