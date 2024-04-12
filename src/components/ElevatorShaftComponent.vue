<template>
    <div class="elevatorshaft-wrapper">
        ElevatorShaft
        <div class="elevatorshaft-wrapper__box">
            <div class="elevatorshaft-wrapper__box-floor" v-for="(item, i) in floors" :key="i">
                <ElevatorComponent :floor="item.floor" v-if="item.state" />
                <button class="elevatorshaft-wrapper__box-floor-button" @click="callElevator(i)">
                    <div class="button-state" v-if="item.state"></div>
                </button>
            </div>

        </div>
    </div>
</template>
<script>
import ElevatorComponent from '@/components/ElevatorComponent.vue'
export default {
    name: 'ElevatorShaftComponent',
    data() {
        return {
            floors: [
                {
                    floor: 1,
                    state: true
                },
                {
                    floor: 2,
                    state: false
                },
                {
                    floor: 3,
                    state: false
                },
                {
                    floor: 4,
                    state: false
                },
                {
                    floor: 5,
                    state: false
                },
            ]
        }
    },
    components: {
        ElevatorComponent
    },
    methods: {
        callElevator(i){
            this.floors.forEach(item => {
                item.state = false
            })
            this.floors[i].state = true
        }
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

        &-floor {
            width: 50px;
            height: 100px;
            border: 1px solid #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &-button {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                border: 1px solid #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: -40px;
                cursor: pointer;
                top: 50%;
                transform: translateX(-50%);

                .button-state {
                    content: '';
                    min-width: 8px;
                    height: 8px;
                    background: red;
                    border-radius: 50%;
                }
            }
        }

    }

}
</style>