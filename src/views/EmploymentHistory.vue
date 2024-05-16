<template>
    <body>
     <form>
       <h2>Employment History</h2>
       <h5>Begin with most recent employment, and include all current jobs</h5>
       <br>
       <div v-for="(entry, index) in emphistory" :key="index">
         <div class="form-group date">
           <label>Date start</label>
           <input type="date" v-model="entry.start_date">
         </div>
         <div class="form-group date">
           <label>Date End</label>
           <input type="date" v-model="entry.end_date">
         </div>
         <div class="form-group fullname">
           <label>Position / Title</label>
           <input type="text" v-model="entry.position">
         </div>
         <div class="form-group fullname">
           <label>Employer</label>
           <input type="text" v-model="entry.employer">
         </div>
         <div class="form-group fullname">
           <label>City</label>
           <input type="text" v-model="entry.city">
         </div>
         <div class="form-group fullname">
           <label>Country</label>
           <input type="text" v-model="entry.country">
         </div>
         <button class="btn btn-danger" @click.prevent="deleteHistory(index)">Delete</button>
       </div>
       <br>
       <button class="btn btn-primary" @click.prevent="addEmployement">Add</button>
       <button type="button" class="btn btn-secondary btn-lg"  style="position: absolute;left: 58%;"  @click.prevent="submit">Next Page</button>
     </form>
   </body>
</template>
 <script>
 import axios from 'axios'
 import { base_url } from '@/constant';
 import swal from 'sweetalert';
 export default {
   data() {
     return {    
        user_id:'',  
       user:[],
       emphistory: JSON.parse(localStorage.getItem('emphistory')) || [{
        start_date: '',
        end_date: '',
        position: '',
        employer: '',
        city: '',  
        country:'',
         
       }]
     };
   },
   mounted() {
   this.user = JSON.parse(localStorage.getItem('user'));
   this.user_id = this.user.id
   console.log(this.user);
   console.log(this.user_id);
   
 },
   methods: {
    addEmployement() {
       this.emphistory.push({
         start_date: '',
         end_date: '',
         position: '',
         employer: '',
         city: '',   
         country:'',
       });
          this.saveToLocalStorage();
     },

     deleteHistory(index) {
  this.emphistory.splice(index, 1);
  // this.saveToLocalStorage();
},

saveToLocalStorage() {
      localStorage.setItem('emphistory', JSON.stringify(this.emphistory));
    },

     submit() {
       axios.post(`${base_url}/save-emphistory`,{emphistory: this.emphistory, user_id:this.user_id} ).then((response)=>{
                       console.log(response);               
                       if(response.data.status==='success'){
                         console.log(response);    
                         this.$router.push('/upload');
                       }
                       }).catch((error)=>{
              console.log(error)
           swal('Sorry,You can not register');
         });
       },
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
