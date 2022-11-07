import Vue from 'vue';

export default {
    successNotification(message){
        Vue.$toast.success(message);
    },
    errorNotification(message){
        Vue.$toast.error(message);
    }
}