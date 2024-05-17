<template>
    <body>
    <form @submit.prevent="submit">
      <h2>Biodata information</h2>
      <button type="button" class="btn btn-danger" @click.prevent="logout">Logout</button>
      <br>
      <br>
      <div class="form-group gender">
        <label for="gender">Program Applied For</label>
        <select id="program" v-model="formData.prog_applied">
          <option value="" selected disabled>Select Program Applied For</option>
          <option value="Male">MPH</option>
          <option value="Female">PHD</option>      
        </select>
      </div>
      <div class="form-group fullname">
      <label for="title">Title</label>
      <select id="title" v-model="formData.title">
        <option value="" selected disabled>Select a Title</option>
        <option v-for="titlename in titles" :key="titlename.id" :value="titlename.id">{{ titlename.title }}</option>
      </select>
    </div>
      <div class="form-group fullname">
        <label for="surname">Surname</label> 
        <input type="text" id="surname" placeholder="Enter your Surname" v-model="formData.surname" >
      </div>
      <div class="form-group fullname">
        <label for="Other Name ">Other Name</label>
        <input type="text" id="Other Name" placeholder="Enter your Other Name" v-model="formData.othernames" >
      </div>
      <div class="form-group gender">
        <label for="gender">Gender</label>
        <select id="gender" v-model="formData.gender">
          <option value="" selected disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>

        </select>
      </div>
      <div class="form-group date">
        <label for="date">Date Of Birth</label>
        <input type="date" id="date" placeholder="Select Your Date Of Birth"  v-model="formData.dob">
      </div>
      <div class="form-group fullname">
        <label for="placeofBirth">Place of Birth</label>
        <input type="text" id="placeofBirth" placeholder="Enter Your Place Of Birth" v-model="formData.placeofbirth" >
      </div>

      <div class="form-group fullname">
        <label for="postaddress">Postal Address</label>
        <input type="text" id="postaladdress" placeholder="Enter Postal  Address" v-model="formData.address">
      </div>
      <div class="form-group fullname">
        <label for="telephonenNumber">Telephone Number</label>
        <input type="text" id="telephonenNumber" placeholder="Enter Telephone Number" v-model="formData.phone">
      </div>
      <div class="form-group email">
        <label for="email">Personal Email</label>
        <input type="text" id="email" placeholder="Enter your Personal Email" v-model="formData.email">
      </div>
      <div class="form-group fullname">
        <label for="previousacademic">Previous Academic Background</label>
        <input type="text" id="previousacademic" placeholder="Enter Your Previous Academic Backgroud" v-model="formData.prevacademic">
      </div>
      <div>
    <div class="form-group gender">
      <label for="currenEnployed">Are You Currently Employed</label>
      <select id="currenEnployed" v-model="formData.isemployed">
        <option value="" isemployed disabled></option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    <div v-if="formData.isemployed === 'Yes'">
      <div class="form-group fullname">
        <label for="position">Position/job title</label>
        <input type="text" id="position" placeholder="Enter The Position/Job Title" v-model="formData.position">
      </div>
      <div class="form-group fullname">
        <label for="institution">Name Of Institution</label>
        <input type="text" id="institution" placeholder="Enter The Name OF the Institution" v-model="formData.employername">
      </div>
      <div class="form-group fullname">
        <label for="postalAddress">Institutional Postal Address</label>
        <input type="text" id="postalAddress" placeholder="Enter Institutional Postal Address" v-model="formData.employeraddress">
      </div>
      <div class="form-group email">
        <label for="institutionEmail">Institution Email Address</label>
        <input type="email" id="institutionEmail" placeholder="Enter Institutional Email" v-model="formData.employeremail">
      </div>
    </div>
  </div>
      <div class="form-group submit-btn">
        <input type="submit" value="Next">
      </div>
      
    </form>
  </body> 
</template>

<script>
import axios from 'axios';
import {base_url} from '../constant'
import swal from 'sweetalert';
export default {
  data() {
    return {
        user_id:'',
        user:[],
        titles: [],
        formData:{
            prog_applied:'',
            title:'',
            surname:'',
            othernames:'',
            gender:'',
            dob:'',
            placeofbirth:'',
            address:'',
            phone:'',
            email:'',  
            prevacademic:'' ,
            isemployed:'',
            position:'',
            employername:'',
            employeraddress:'',
            employeremail:''      
        }    
    }  
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user_id = this.user.id
    console.log(this.user);
    console.log(this.user_id);
    this.fetchTitles();
    this.getFormData() 
  },

  methods:{
    submit(){
     console.log(this.formData);     
     axios.post(`${base_url}/save-biodata`, {
        user_id:this.user_id,
        prog_applied:this.formData.prog_applied, 
        title:this.formData.title,
        surname:this.formData.surname,
        othernames:this.formData.othernames,
        gender:this.formData.gender,
        dob:this.formData.dob,
        placeofbirth:this.formData.placeofbirth,
        address:this.formData.address,
        phone:this.formData.phone,
        email:this.formData.email,
        prevacademic:this.formData.prevacademic,
        isemployed:this.formData.isemployed,
        position:this.formData.position,
        employername:this.formData.employername,
        employeraddress:this.formData.employeraddress,
        employeremail:this.formData.employeremail     
      }).then((response)=>{
        console.log('Response:', response);
      if(response.data.status === 'success'){
        this.$router.push('/edu');
        localStorage.setItem('apikey', response.data.apikey);
        
      }else{
        swal('Invalid input')
      }
        }).catch((err)=>{
            swal('Oops','No Internet Connection detected','error');
             console.log(err)
     });
    },
    fetchTitles() {
      axios.get(`${base_url}/title`)
        .then(response => {
          this.titles = response.data.title;
        })
        .catch(error => {
          console.error('Error fetching titles:', error);
        });
    },

    // store date
    getFormData() {
      // var user_id=12;
axios.post(`${base_url}/get-biodata`, {user_id: this.user_id}).then((response) => {
          // if(response.data.status === 'success'){
              //  this.formData.surname = response.data.biodata.surname
              //  this.formData.othernames = response.data.biodata.othernames
              //  this.formData.title = response.data.biodata.title
              //  this.formData.gender = response.data.biodata.gender
          //  let biodataForm = response.data.biodata;
          //  for( const property in biodataForm){
          //   this.formData[property] = biodataForm[property];
          //  }
          this.formData = response.data.biodata
          //  console.log(biodataForm);
          console.log(response.data);       
        })  .catch(error => {
          console.error('Error fetching titles:', error);
        });
    },

    logout(){
      alert("Are you sure to Logout");
      localStorage.clear();
      this.$router.push('/');
    }
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