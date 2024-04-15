<template>
    <div class="elevatorshaft-wrapper">
        ElevatorShaft
        <div class="elevatorshaft-wrapper__box">
            <div class="elevatorshaft-wrapper__box-floor" v-for="(item, i) in floors" :key="i" ref="floor">
                <button class="elevatorshaft-wrapper__box-floor-button" @click="callElevator(i, true)">
                    <div class="button-state" v-if="item.state"></div>
                </button>
            </div>
            <ElevatorComponent :floor="this.currentFloor" ref="elevator" />
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
            ],
            floorHeigh: 0,
            interval: 0,
            currentFloor: 1,
            callFloor: [],
            instanceInterval: null,
            nextCall: true,
        }
    },
    components: {
        ElevatorComponent
    },
    methods: {
        liftMoveUp(i) {
            this.nextCall = false
            this.instanceInterval = setInterval(() => {
                this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.interval}px)`
                this.currentFloor = this.interval
                if (this.interval >= i) {
                    clearInterval(this.instanceInterval)
                    this.nextCall = true
                    if (this.callFloor.length > 0) {
                        this.callElevator(this.callFloor[0], false)
                    }
                } else {
                    this.interval++

                }
            }, 1000)
        },
        liftMoveDown(i) {
            this.nextCall = false
            this.instanceInterval = setInterval(() => {
                this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.interval}px)`
                this.currentFloor = this.interval
                if (this.interval <= i) {
                    clearInterval(this.instanceInterval)
                    this.nextCall = true
                    if (this.callFloor.length > 0) {
                        this.callElevator(this.callFloor[0], false)
                    }
                } else {
                    this.interval--

                }
            }, 1000)
        },
        moveLift() {
            this.callFloor.forEach(item => {
                if (this.nextCall) {
                    if (item - this.currentFloor > 0) {
                        this.liftMoveUp(item)
                    } else if (item - this.currentFloor < 0) {
                        this.liftMoveDown(item)
                    } else if (item - this.currentFloor === 0) {
                        console.log('lift on your floor now')
                    }
                }
            })
        },
        callElevator(i, bool) {
            this.floors.forEach(item => {
                item.state = false
            })
            this.floors[i].state = true
            if (bool) {
                this.callFloor.push(i)
            } else {
                this.callFloor = this.callFloor.slice(1)
            }
            this.moveLift()
        }
    },
    mounted() {
        this.floorHeigh = this.$refs.floor[0].offsetHeight
        this.$refs.elevator.$el.style.height = this.$refs.floor[0].offsetHeight + 'px'
        this.$refs.elevator.$el.style.width = this.$refs.floor[0].offsetWidth - 5 + 'px'
        console.log(this.floorHeigh)



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