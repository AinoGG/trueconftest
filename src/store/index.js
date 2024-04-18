import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        floorHeight: 0,
        floors: [
            {
                floor: 1,
                state: false,
                disable: false
            },
            {
                floor: 2,
                state: false,
                disable: false
            },
            {
                floor: 3,
                state: false,
                disable: false
            },
            {
                floor: 4,
                state: false,
                disable: false
            },
            {
                floor: 5,
                state: false,
                disable: false
            },
            {
                floor: 6,
                state: false,
                disable: false
            },
            {
                floor: 7,
                state: false,
                disable: false
            },
        ],
        buttons: [
            {
                active: false
            },
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
                ref: 'elevator',
                callQueue: [

                ],
                id: 'first'
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
                ref: 'elevator1',
                callQueue: [

                ],
                id: 'second'
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
                ref: 'elevator2',
                callQueue: [

                ],
                id: 'third'
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
                ref: 'elevator2',
                callQueue: [

                ],
                id: 'fourth'
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
                ref: 'elevator2',
                callQueue: [

                ],
                id: 'fifth'
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
        getIndexActive(state) {
            return state.activeIndex
        },
        getFloorHeight(state) {
            return state.floorHeight
        }
    },
    mutations: {
        setShaftObject(state, payload) {
            state.shafts = payload
        },
        setFloorsState(state, payload) {
            state.floors = payload
        },
        setFloorHeight(state, payload) {
            state.floorHeight = payload
        },               
        setCallQueue(state, payload) {
            let result = []
            state.shafts.forEach(item => {
                if(item.nextCall && !item.restStatus) {
                    result.push(Math.abs(payload - item.currentFloor))
                } else {
                    result.push(state.floors.length)  
                }
            })
            let index = result.indexOf(Math.min(...result))
            state.shafts[index].callQueue.push(payload)  
        },
        
    },
    actions: {

    },
});