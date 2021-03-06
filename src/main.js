// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import * as firebase from "firebase";
import router from "./router";
import { store } from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import DateFilter from "./filters/date";
import AlertCmp from "./components/Shared/Alert.vue";
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'


Vue.use(Vuetify, {
  theme: {
    primary: "#262216",
    secondary: "#49412c",
    accent: "#97743a",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    background: "#b0a18e"
  }
});

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog)
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog)
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog)
Vue.component("app-meetup-register-dialog", RegisterDialog)


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAvzPXGIaNPYiJ3N3tE3dfsh3pUrrokLX0",
      authDomain: "vue-vuetify.firebaseapp.com",
      databaseURL: "https://vue-vuetify.firebaseio.com",
      projectId: "vue-vuetify",
      storageBucket: "gs://vue-vuetify.appspot.com/" 
    });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.$store.dispatch('autoSignIn', user)
      this.$store.dispatch('fetchUserData')
    }
  })
    this.$store.dispatch('loadMeetups')
  }
});
