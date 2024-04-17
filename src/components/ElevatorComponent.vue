<template>
    <div class="elevator-box" :class="{ animate: rest}" :id="idLift" :style="{transform: translateStyle}">
        <span class="up" v-if="moveUp">^</span>
        <div>{{ floor }}</div> 
        <span class="down" v-if="moveDown">^</span>
    </div>
</template>
<script>
export default {
    name: 'ElevatorComponent',
    props: ['floor', 'rest', 'moveDown', 'moveUp', 'active', 'floorH', 'idLift'],
    computed: {
        translateStyle() {
            return `translate(-50%, -${this.floorH * (this.floor - 1)}px)`
        }
    }
}
</script>
<style lang="scss">
.elevator-box {
    width: calc(100% - 10px);
    // height: 90%;
    background: #4d7ba0;
    color: #fff;
    border: 1px solid #4da076;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    flex-direction: column;
    &.animate {
        animation: rest 3s;
    }

    .down {
        transform: rotate(180deg);
    }
}

@keyframes rest {
    25% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }

}
</style>