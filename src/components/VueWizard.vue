<template>
  <FormWizard @on-complete="onComplete" color="#094899" :startIndex = Number(startindex) @on-change = "onChange" beforeChange="beforeChange">
    <TabContent title="Biodata Information" icon="fa fa-user" route ='/formdata' active = "true" >
    
    </TabContent>
    <TabContent title="Educational Background" icon="fa fa-gear" route ='/edu' active = "true" >
     
    </TabContent>
    <TabContent title="Employment History" icon="fa fa-city" route ='/employhis' active = "true" >       
    </TabContent>
  </FormWizard>
</template>
<script>
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
export default {
  props:['startindex'],
  components: {
    FormWizard,
    TabContent,
  },
  data:()=>{
    return {
        //startindex:1,
    }
  },
  methods: {
    beforeChange(){
        return true
    },
    //  onComplete() {
    //   alert("Yay. Done!");
    // },
    // onChange(index) {
    // console.log(index)
    // },
    // onChange(p,n){
    //     //console.log(e)
    //     this.$emit('onchange', p,n)
    // }

  },
};
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");
</style>