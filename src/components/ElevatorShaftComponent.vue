<template>
    <div class="elevatorshaft-wrapper">
        <div class="elevatorshaft-wrapper__box">
            <div class="elevatorshaft-wrapper__box-floor" v-for="(item, i) in getFloors" :key="i" ref="floor">

            </div>
            <ElevatorComponent :active="itemShaft.callQueue.length > 0" :floor="itemShaft.currentFloor + 1" :rest="itemShaft.restStatus"
                :moveUp="itemShaft.moveUp" :floorH="floorHeight" :moveDown="itemShaft.moveDown" :idLift="itemShaft.id" ref="elevator" />
        </div>

        
    </div>
</template>
<script>
import ElevatorComponent from '@/components/ElevatorComponent.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'ElevatorShaftComponent',
    props: ['itemShaft'],
    data() {
        return {
            floorHeight: 0,
            elevatorVisible: false
        }
    },
    components: {
        ElevatorComponent
    },

    computed: {
        ...mapGetters([
            'getFloors',
            'getCallQueue',
            'getShafts',
            'getFloors',
            'getIndexActive',
            'getFloorHeight'
        ])
    },
    mounted() {
        //в маунте задаем размер этажа, чтобы двигать кабину по этому размеру, так, что если верстка этажей поменяется, кабина все равно будет двигаться правильно и будет занимать всю высоту этажа
        this.floorHeight = this.$refs.floor[0].offsetHeight
        this.$refs.elevator.$el.style.height = this.$refs.floor[0].offsetHeight + 'px'
        this.$refs.elevator.$el.style.width = this.$refs.floor[0].offsetWidth - 5 + 'px'

        this.$store.commit('setFloorHeight', this.floorHeight)
        this.elevatorVisible = true
    }
}
</script>
<style lang="scss">
.elevatorshaft-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &__box {
        display: flex;
        flex-direction: column-reverse;
        position: relative;

        &-floor {
            width: 50px;
            height: 100px;
            border: 1px solid #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

           
        }

    }

}
</style>