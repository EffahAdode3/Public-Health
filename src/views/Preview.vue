<template>
      <body>
      <form>
        <h2>Biodata information</h2>    
          <div class="form-group date">
            <h5>Program Applied For</h5>
            <p>{{ formData.prog_applied}}</p>
          </div>
          <div class="form-group date">
           <h5>Title</h5>
            <p>{{ formData.title }}</p>
        
          </div>
          <div class="form-group fullname">
            <h5>Surname</h5>
           <p>{{ formData.surname }}</p>
          </div>
          <div class="form-group fullname">
            <h5>Other Name</h5>
            <p> {{ formData.othernames }}</p>
       
          </div>
          <div class="form-group fullname">
           <h5>Gender</h5>
            <p>{{ formData.gender }}</p>
          </div>
          <div class="form-group fullname">
            <h5>Date Of Birth</h5> 
            <p>{{ formData.dob }}</p>    
          </div>
          <div class="form-group fullname">
            <h5>Place of Birth</h5>
            <p>{{ formData.placeofbirth }}</p>     
          </div>
          <div class="form-group fullname">
            <h5>Postal Address  </h5>
            <p>{{ formData.address }}</p>     
          </div>
          <div class="form-group fullname">
        <h5>Telephone Number</h5>
             <p> {{ formData.phone }}</p>
      </div>
          <div class="form-group fullname">
            <h5>Personal Email</h5>
           
            <p>{{ formData.email }}</p>      
          </div>
          <div class="form-group fullname">
            <h5>Previous Academic Background</h5> 
            <p>{{ formData.prevacademic }}</p>      
          </div>
          <div class="form-group fullname">
            <h5>Are You Currently Employed </h5>
             <p>{{ formData.isemployed }}</p>
          </div>
          <div class="form-group fullname">
            <h5>Position/job title</h5>

            <p>{{ formData.position }}</p>      
          </div>
          <div class="form-group fullname">
            <h5>Name Of Institution</h5>    
            <p>{{ formData.employername }}</p>  
          </div>
          <div class="form-group fullname">
            <h5>Institutional Postal Address</h5>    
            <p>{{ formData.employeraddress }}</p>    
          </div>
          <div class="form-group fullname">
            <h5>Institution Email Address</h5>
            <p>{{ formData.employeraddress }}</p>   
          </div>
      
<div v-for="(edu, index) in educationBackground" :key="index">
          <h2>Educational Background</h2>    
          <div class="form-group date">
            <h5>Date start</h5>
            <p>{{ edu.start_date}}</p>
          </div>
          <div class="form-group date">
           <h5>Date End</h5>
            <p>{{ edu.end_date }}</p>
        
          </div>
          <div class="form-group fullname">
            <h5>Institution Attended</h5>
           <p>{{ edu.institution }}</p>
          </div>
          <div class="form-group fullname">
            <h5>Area of specialization (Major subject)</h5>
            <p> {{ edu.subjects }}</p>
       
          </div>
          <div class="form-group fullname">
           <h5>Degree completed</h5>
            <p>{{ edu.degree }}</p>
          </div>
        </div>



        <div v-for="(employ, index) in employmentHistory" :key="index">
          <h2>Employment History</h2>    
          <div class="form-group date">
            <h5>Date start</h5>
            <p>{{ employ.start_date}}</p>
          </div>
          <div class="form-group date">
           <h5>Date End</h5>
            <p>{{ employ.end_date }}</p>
        
          </div>
          <div class="form-group fullname">
            <h5>Position / Title</h5>
           <p>{{ employ.position }}</p>
          </div>
          <div class="form-group fullname">
            <h5>Employer</h5>
            <p> {{ employ.employer }}</p>
       
          </div>
          <div class="form-group fullname">
           <h5>City</h5>
            <p>{{ employ.city }}</p>
          </div>
          <div class="form-group fullname">
           <h5>Country</h5>
            <p>{{ employ.country }}</p>
          </div>
        </div>
         
        <button type="button" class="btn btn-secondary btn-lg"  style="position: absolute;left: 58%;"  @click.prevent="submit">Submit</button>
      </form>
    </body>
  </template>
  
  <script>
  import axios from 'axios';
  import { base_url } from '../constant';
  
  export default {
    data() {
      return {
        user_id: '',
        user: {},
        formData: '' ,
        educationBackground:'',
        employmentHistory : ''
      };
    },
  
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user && this.user.id) {
        this.user_id = this.user.id;
        console.log("User:", this.user);
        console.log("User ID:", this.user_id);
        this.getFormData();
        this.geteducationalBackground();
        this.getemployhistory();
      } 
    },
  
    methods: {
      getFormData() {
        axios.post(`${base_url}/get-biodata`, { user_id: this.user_id })
          .then((response) => {
            console.log('Response data:', response.data);
            this.formData = response.data.biodata;  // Default to an empty array if no biodata
            console.log('Assigned formData:', this.formData);
          })
          .catch(error => {
            console.error('Error fetching titles:', error);
          });
      },


      geteducationalBackground() {
        axios.post(`${base_url}/get-edubackground`, { user_id: this.user_id })
          .then((response) => {
            console.log('Response data:', response.data);
            this.educationBackground = response.data.eduhistory;  // Default to an empty array if no biodata
            console.log('Assigned education:', this.educationBackground);
          })
          .catch(error => {
            console.error('Error fetching titles:', error);
          });
      },

      getemployhistory() {
        axios.post(`${base_url}/get-emphistory`, { user_id: this.user_id })
          .then((response) => {
            console.log('Response data:', response.data);
            this.employmentHistory  = response.data.emphistory;
            console.log('Assigned education:', this.employementHistory );
          })
          .catch(error => {
            console.error('Error fetching titles:', error);
          });
      },

    }
  };
  </script>
  



  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    min-height: 100vh;
    background: #1BB295;
  }
  
  .btn btn-secondary btn-lg{
      position: absolute;
      left: 54%;
  
  }
  form {
    padding: 25px;
    background: #fff;
    max-width: 500px;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  }
  form h2 {
    font-size: 27px;
    text-align: center;
    margin: 0px 0 30px;
  }
  form .form-group {
    margin-bottom: 15px;
    position: relative;
  }
  form label {
    display: block;
    font-size: 15px;
    margin-bottom: 7px;
  }
  form input,
  form select {
    height: 45px;
    padding: 10px;
    width: 100%;
    font-size: 15px;
    outline: none;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
  }
  form input:focus,
  form select:focus {
    border-color: #9a9a9a;
  }
  form input.error,
  form select.error {
    border-color: #f91919;
    background: #f9f0f1;
  }
  form small {
    font-size: 14px;
    margin-top: 5px;
    display: block;
    color: #f91919;
  }
  form .password i {
    position: absolute;
    right: 0px;
    height: 45px;
    top: 28px;
    font-size: 13px;
    line-height: 45px;
    width: 45px;
    cursor: pointer;
    color: #939393;
    text-align: center;
  }
  .submit-btn {
    margin-top: 30px;
  }
  .submit-btn input {
    color: white;
    border: none;
    height: auto;
    font-size: 16px;
    padding: 13px 0;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    text-align: center;
    background: #1BB295;
    transition: 0.2s ease;
  }
  .submit-btn input:hover {
    background: #179b81;
  }
  </style>