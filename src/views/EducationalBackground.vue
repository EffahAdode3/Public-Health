<template>
    <div>
    <VueWizard  startindex=1></VueWizard>
     <body>
      <form>
        <h2>Educational Background</h2>
        <button type="button" class="btn btn-danger"  @click.prevent="logout">Logout</button>
        <br>
        <br>
        <div v-for="(entry, index) in edubackground" :key="index">      
          <h3>Educational Background {{ index + 1 }}</h3>
          <div class="form-group date">
            <label>Date start</label>
            <input type="date" v-model="entry.start_date">
          </div>
          <div class="form-group date">
            <label>Date End</label>
            <input type="date" v-model="entry.end_date">
          </div>
          <div class="form-group fullname">
            <label>Institution Attended</label>
            <input type="text" v-model="entry.institution">
          </div>
          <div class="form-group fullname">
            <label>Area of specialization (Major subject)</label>
            <input type="text" v-model="entry.subjects">
          </div>
          <div class="form-group fullname">
            <label>Degree completed</label>
            <input type="text" v-model="entry.degree">
          </div>
          <button class="btn btn-danger" @click.prevent="deleteHistory(index)">Delete</button>
        </div>
        <br>
        <button type="button" class="btn btn-secondary btn-lg"  style="position: absolute;left: 40%;"  @click.prevent="GoBack">Go Back</button>
        <button class="btn btn-primary" @click.prevent="addHistory">Add</button>
        <button type="button" class="btn btn-secondary btn-lg"  style="position: absolute;left: 58%;"  @click.prevent="submit">Next</button>
      </form>
 
    </body>
    </div>
</template>
  <script>
  import axios from 'axios'
  import { base_url } from '@/constant';
  import swal from 'sweetalert';
  import VueWizard from '../components/VueWizard.vue'
  export default {
    components:{
    VueWizard,
    },
    data() {
      return {   
        VueWizard,       
        user_id:'',
        user:[],
        edubackground: JSON.parse(localStorage.getItem('edubackground')) || [{
          start_date: '',
          end_date: '',
          institution: '',
          subjects: '',
          degree: '',   
            
        }]     
      };
    },
    mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user_id = this.user.id
    console.log(this.user);
    console.log(this.user_id);
    this. getFormData()
  },
    methods: {
      addHistory() {
        this.edubackground.push({
          start_date: '',
          end_date: '',
          institution: '',
          subjects: '',
          degree: '',
      
        });
      },
      
  deleteHistory(index) {
  this.edubackground.splice(index, 1);
  localStorage.removeItem('edubackground', index);

},
      submit() {
        console.log(this.edubackground);
        axios.post(`${base_url}/save-edubackground`, {edubackground:this.edubackground, user_id:this.user_id }).then((response)=>{
                        console.log(response);               
                        if(response.data.status==='success'){
                          console.log(response);  
                          this.$router.push('/employhis');
                        }
                        }).catch((error)=>{
               console.log(error)
            swal('Sorry,You can not register');
          });
        },

        getFormData() {

axios.post(`${base_url}/get-edubackground`, {user_id: this.user_id}).then((response) => {
           this.edubackground = response.data.eduhistory;      
          console.log(response.data);       
        })  .catch(error => {
          console.error('Error fetching titles:', error);
        });
    },
    GoBack(){
      this.$router.push('/formData');
    },
    logout(){
      alert("Are you sure to Logout");
      localStorage.clear();
      // window.location.href="/";
      this.$router.push('/');
    }
      },
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
  background-image: url('../assets/back.jpg');
  background-position: center;
  background-size: cover; 
  /* background: #1BB295; */
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
