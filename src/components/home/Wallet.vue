<template>
    <div>
        <router-view>
        </router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
    	test(){
    		this.$router.push("/wallet/wellet_01")
    	}
    }
}
</script>

<style scoped>

</style>
