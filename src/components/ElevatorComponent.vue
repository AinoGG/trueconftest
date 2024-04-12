<template>
    <div class="elevator-box">
        {{floor}}
    </div>
</template>
<script>
export default {
    name: 'ElevatorComponent',    
    props: ['floor']
}
</script>
<style lang="scss">
.elevator-box{
    width: calc(100% - 10px);
    height: 90%;
    background: #4d7ba0;
    color: #fff;
    border: 1px solid #4da076;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>