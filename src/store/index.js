import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        floorHeight: 0,
        floors: [
            {
                floor: 1,
                state: false
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
        buttons: [
            {
                active: false
            },
        ],
        callQueue: [

        ],
        shafts: [
            {
                active: true,
                currentFloor: 0,
                interval: 0,
                instanceInterval: null,
                nextCall: true,
                restStatus: false,
                moveUp: false,
                moveDown: false,
                ref: 'elevator'
            },
            {
                active: false,
                currentFloor: 0,
                interval: 0,
                instanceInterval: null,
                nextCall: true,
                restStatus: false,
                moveUp: false,
                moveDown: false,
                ref: 'elevator1'
            },
        ],
        activeIndex: 0
    },
    getters: {
        getFloors(state) {
            return state.floors
        },
        getButtons(state) {
            return state.buttons
        },
        getShafts(state) {
            return state.shafts
        },
        getCallQueue(state) {
            return state.callQueue
        },
        getIndexActive(state) {
            return state.activeIndex
        },
         getFloorHeight(state) {
            return state.floorHeight
         }
    },
    mutations: {
        setFloorHeight(state, payload) {
            state.floorHeight = payload
        },
        setFloors(state, payload) {
            state.floors = payload
        },
        setButtons(state, payload) {
            state.buttons.push(payload)
        },
        setIntervalItemShaft(state, payload) {
            state.shafts.forEach(item => {
                if (item.active && payload) {
                    item.interval++
                } else if (item.active && !payload) {
                    item.interval--
                }
            })
        },
        setItemCurrentFloor(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.currentFloor = payload
                }
            })
        },
        setCallQueue(state, payload) {
            if (payload || payload === 0) {
                state.callQueue.push(payload)
            } else if (payload === null) {
                state.callQueue = state.callQueue.slice(1)
            }
        },
        setInstanceInterval(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.instanceInterval = payload
                }
            })
        },
        setNextCall(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.nextCall = payload
                }
            })
        },
        setMoveUp(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.moveUp = payload
                }
            })
        },
        setMoveDown(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.moveDown = payload
                }
            })
        },
        setRestStatus(state, payload) {
            state.shafts.forEach(item => {
                if (item.active) {
                    item.restStatus = payload
                }
            })
        },
        setIndexActive(state) {
            state.shafts.forEach((item, index) => {
                if(item.active) {
                    state.activeIndex = index
                }
                console.log(state.activeIndex)
            })
        }
    },
    actions: {

    },
});