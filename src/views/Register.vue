<template>
      <body>
    <form @submit.prevent="signup">
      <!-- <h2>Account Registration</h2> -->
      <img src="../assets/UGlogo.jpeg" alt="" style="max-height:100px;display:block;margin:auto">
      <div class="form-group fullname">
        <label for="fullname">Surname</label>
        <input type="text" id="surname" placeholder="Enter your Surname"  v-model="formdata.surname" required >
      </div>
      <div class="form-group fullname">
        <label for="fullname">Other Names</label>
        <input  type="text" id="othersname" placeholder="Enter your Other Names " v-model="formdata.othernames" required>
      </div>
      <div class="form-group email">
        <label for="email">Email Address</label>
        <input  type="text" id="email" placeholder="Enter your email address" v-model="formdata.email" required >
      </div>
      <div class="form-group password">
        <label for="password">Password</label>
        <input  type="password" id="password" placeholder="Enter your password"  v-model="formdata.password" required >
        <i id="pass-toggle-btn" class="fa-solid fa-eye"></i>
      </div>
      <div class="form-group password">
        <label for="password"> Comfirmed Password</label>
        <input  type="password" id="cfmpassword" placeholder="Enter your Retype-password" v-model="confirmPassword" required>
        <i id="pass-toggle-btn" class="fa-solid fa-eye"></i>
      </div>
      <div class="form-group submit-btn">
        <input type="submit" value="Submit"  >
      
      </div>
      <div class="field">
                    <span><a href="/">Already having accounts?  Click to Login</a></span>
                </div>
      
    </form>
  </body>
</template>
<script>
import axios from 'axios'
import {base_url} from '../constant'
import swal from 'sweetalert';
 export default{
     data(){
        return{          
            formdata:{
            surname:'',
              othernames:'',
              email:'',
              password:'',
             
          },
          confirmPassword: ''

        }
     
     },
     methods:{
        signup(){
          if (this.formdata.password !== this.confirmPassword) {
        swal("Passwords do not match!", "...Make sure the Password Match!");
        return; 
      }
                    axios.post(`${base_url}/createuser`, this.formdata).then((response)=>{
                        console.log(response);               
                        if(response.data.status==='success'){
                          localStorage.setItem('apikey',response.data.apikey);
                          localStorage.setItem('user',JSON.stringify(response.data.user));
                             this.$router.push('/formData');        
                            console.log("Succefully Done")
              }else if(response.data.status==='exists'){
                    swal('An Account has already been created with this email.. Please login instead','error');
              }else{
                   swal(`The ${this.formdata.email} must be a valid email address.`);
              }
             }).catch((error)=>{
               console.log(error)
            swal('Sorry,Your account could not be created');
          });
        } 
     }
     }
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
  /* background-color: blue; */
  background-image: url('../assets/back.jpg');
  background-size: cover; 
  /* background-position: center; */
}
.field a {
       text-decoration: none;
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