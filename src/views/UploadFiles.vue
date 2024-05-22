<template>
    <div>
      <br>
      <br>
      <select 
        class="form-select form-select-lg mb-3 custom-select" 
        aria-label="Large select example" 
        v-model="selectedFileType">
        <option selected disabled>Select File To Upload</option>
        <option value="Cover letter">Cover letter</option>
        <option value="Curriculum vitae CV">Curriculum vitae CV</option>
        <option value="Personal Statement">Personal Statement</option>
        <option value="Letter of recommendation">Letter of recommendation</option>
      </select>     
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="input-group mb-3 custom-input-group">
      <label class="input-group-text" for="inputGroupFile01">Upload</label>
      <input type="file" class="form-control" id="inputGroupFile01" accept=".pdf" multiple @change="onFileChange">
      <button class="formbold-btn w-full" @click="uploadFile">Next</button>
    </div>
  <br>
  <br><br>
    <div v-if="selectedFiles.length > 0">
      <h4>Files to be uploaded:</h4>
      <ul>
        <li v-for="(file, index) in selectedFiles" :key="index">
          {{ file.name }}
          <button @click="removeFile(index)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import swal from 'sweetalert'; 
  import { base_url } from '@/constant';
  
  export default {
    data() {
      return {
        selectedFileType: '',
        selectedFiles: [],
      };
    },
    methods: {
      onFileChange(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          if (files[i].type !== 'application/pdf') {
            alert('Please upload only PDF files.');
            return;
          }
          // Check if the file already exists in the selectedFiles array
          if (!this.selectedFiles.some(file => file.name === files[i].name)) {
            this.selectedFiles.push(files[i]);
          }
        }
      },
      removeFile(index) {
        this.selectedFiles.splice(index, 1);
      },
      uploadFile() {
        if (!this.selectedFileType || this.selectedFiles.length === 0) {
          alert('Please select a file type and at least one file to upload.');
          return;
        }
        const formData = new FormData();
        formData.append('type', this.selectedFileType);
        this.selectedFiles.forEach(file => {
          formData.append('file', file);
        });
        axios.post(`${base_url}/uploadfile`, formData)
          .then((response) => {
            console.log(response.data);
            if (response.data.status === 'success') {
              this.$router.push('/preview');
              swal('Files Uploaded Correctly');
            } else {
              swal('Files were not able to be uploaded');
            }
          })
          .catch((error) => {
            console.log(error);
            swal('Sorry, Unable to upload Files');
          });
      }
    },
  };
  </script>
  
  <style scoped>
  .custom-select {
    width: 50%;
    position: absolute;
    left: 32%;
  }
  
  .custom-input-group {
    width: 50%;
    position: absolute;
    left: 32%;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  button {
    margin-left: 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  div {
  margin: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

button {
  background-color: #ff6666;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff3333;
}

/* Responsive design */
@media (max-width: 600px) {
  li {
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    margin-top: 5px;
  }
}
  </style>
  