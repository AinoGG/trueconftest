<template>
    <div class="house-wrapper">
        <ElevatorShaftComponent v-for="(item, i) in getShafts" :key="i" :itemShaft="item" />
        <div class="button-box">
            <button v-for="(item, i) in getFloors" :key="i + 'button'" @click="callElevator(i, true)"
                :disabled="item.state || item.disable">
                <div class="button-state" v-if="item.state"></div>
            </button>
        </div>
    </div>
</template>
<script>
import ElevatorShaftComponent from '@/components/ElevatorShaftComponent.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'HouseComponent',
    components: {
        ElevatorShaftComponent
    },
    computed: {
        ...mapGetters([
            'getShafts',
            'getFloors',
            'getIndexActive',
            'getFloorHeight'
        ])
    },
    methods: {
        callElevator(i, bool) {
            this.getFloors[i].state = true
            if (bool) {
                this.$store.commit('setCallQueue', i)
                this.startMove()
            } else {
                this.startMove()
            }
            localStorage.setItem('shafts', JSON.stringify(this.getShafts))
        },
        startMove() {
            this.getShafts.forEach(item => {
                if (!item.restStatus && item.callQueue.length > 0) {
                    this.moveLift(item)
                }
            })
        },
        moveLift(item) {
            if (item.nextCall) {
                if (item.callQueue[0] - item.currentFloor > 0) {
                    this.liftMoveUp(item.callQueue[0], item)
                } else if (item.callQueue[0] - item.currentFloor < 0) {
                    this.liftMoveDown(item.callQueue[0], item)
                } else if (item.callQueue[0] - item.currentFloor === 0) {
                    console.log('lift on your floor now')
                    this.cahngeRestStatus(item)
                }
            }
        },
        finishMove(item) {
            this.getFloors[item.currentFloor].disable = true
            localStorage.setItem('floors', JSON.stringify(this.getFloors))
            this.cahngeRestStatus(item)
            clearInterval(item.instanceInterval)
            item.nextCall = true
        },
        arrowCheck(item, down, up) {
            item.nextCall = false
            item.moveDown = down
            item.moveUp = up
            this.getFloors[item.currentFloor].disable = false
            localStorage.setItem('floors', JSON.stringify(this.getFloors))
        },
        liftMoveUp(i, item) {
            this.arrowCheck(item, false, true)
            item.instanceInterval = setInterval(() => {
                document.querySelector(`#${item.id}`).style.transform = `translate(-50%, -${this.getFloorHeight * item.currentFloor}px)`
                if (item.currentFloor >= i) {
                    this.finishMove(item)
                } else {
                    item.currentFloor++
                }
            }, 1000)
        },
        liftMoveDown(i, item) {
            this.arrowCheck(item, true, false)
            item.instanceInterval = setInterval(() => {
                document.querySelector(`#${item.id}`).style.transform = `translate(-50%, -${this.getFloorHeight * item.currentFloor}px)`
                if (item.currentFloor <= i) {
                    this.finishMove(item)
                } else {
                    item.currentFloor--
                }
            }, 1000)
        },
        cahngeRestStatus(item) {
            item.restStatus = true
            item.moveDown = false
            item.moveUp = false
            item.callQueue = item.callQueue.slice(1)
            localStorage.setItem('shafts', JSON.stringify(this.getShafts))
            
            setTimeout(() => {
                item.restStatus = false
                this.getFloors[item.currentFloor].state = false
                localStorage.setItem('floors', JSON.stringify(this.getFloors))
                if (item.callQueue.length > 0) {
                    this.callElevator(item.callQueue[0], false)
                }                
                
            }, 3000)
        },
        checkButtonDisable() {
            this.getShafts.forEach(item => {
                this.getFloors.forEach(floorItem => {
                    if (item.currentFloor + 1 === floorItem.floor) {
                        floorItem.disable = true
                    }
                })
            })
        }
    },
    mounted() {

        if (localStorage.getItem('shafts') && localStorage.getItem('floors')) {
            this.$store.commit('setShaftObject', JSON.parse(localStorage.getItem('shafts')))
            this.$store.commit('setFloorsState', JSON.parse(localStorage.getItem('floors')))
            this.getShafts.forEach((item) => {
                item.nextCall = true
                if(item.restStatus) {
                    this.getFloors[item.currentFloor].state = false
                }
                item.restStatus = false
            })
            this.startMove()
            this.checkButtonDisable()
        }
    }
}
</script>
<style lang="scss">
.house-wrapper {
    display: flex;
    gap: 20px;

    .button-box {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;

        button {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // position: absolute;
            // right: -40px;
            // top: 50%;
            // transform: translateX(-50%);

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
</style>