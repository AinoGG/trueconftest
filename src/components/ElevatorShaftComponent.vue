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
    // methods: {
    //     //нажимаем кнопку вызова, передаем два параметра i - Этаж, bool - булево значение которое определяет вызов идет по нажатию или это вызов из очереди уже нажатой
    //     callElevator(i, bool) {
    //         //включаем лампочку на кнопке
    //         this.getFloors[i].state = true

    //         //если нажали из состояния покоя то пушим в очередь, если запустили из очереди, то убираем первый элемент из массива, и выключаем лампочку на этаже
    //         if (bool) {
    //             this.$store.commit('setCallQueue', i)
    //         } else {
    //             this.$store.commit('setCallQueue', null)
    //             this.getFloors[i].state = false
    //         }
    //         //если состояние покоя отмигалось, то запускаем лифт дальше
    //         if (!this.itemShaft.restStatus) {
    //             this.moveLift()
    //         }
    //         console.log(this.getCallQueue)

    //     },
    //     moveLift() {
    //         //тут проходимся по очереди этажей, на самом деле можно было просто текущий первый элемент из очереди брать, потому что все равно nextCall становится фолс при запуске любого из условий и цикл дальше не идет, но сначала другая идея реализации была. Это первый кандидат на рефакторинг
    //         if (this.itemShaft.nextCall) {
    //             //смотрим разница этажей положительная едем вверх, если отрицательная - вниз, позже сделал дизейбл кнопок если кабина на этаже вызова, но функционал уведомления оставил
    //             if (this.getCallQueue[0] - this.itemShaft.currentFloor > 0) {
    //                 this.liftMoveUp(this.getCallQueue[0])
    //             } else if (this.getCallQueue[0] - this.itemShaft.currentFloor < 0) {
    //                 this.liftMoveDown(this.getCallQueue[0])
    //             } else if (this.getCallQueue[0] - this.itemShaft.currentFloor === 0) {
    //                 console.log('lift on your floor now')
    //             }
    //         }
    //     },
    //     //движение сделал через трансформ, при запуске метода закрываем возможность циклу идти и тем самым даем остановиться на первом элементе очереди        
    //     liftMoveUp(i) {
    //         this.$store.commit('setNextCall', false)
    //         //выбираем направление для стрелок
    //         this.$store.commit('setMoveDown', false)
    //         this.$store.commit('setMoveUp', true)
    //         //запускаем интервал, который смотрит, если аргумент i превышает объявленную переменную, тогда стопим интервал и запускаем функции по остановке и отдыху, и разрешаем некстКолл, иначе прибавляем переменную interval
    //         this.$store.commit('setInstanceInterval', setInterval(() => {
    //             this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.itemShaft.interval}px)`
    //             this.$store.commit('setItemCurrentFloor', this.itemShaft.interval)
    //             if (this.itemShaft.interval >= i) {
    //                 this.cahngeRestStatus()
    //                 clearInterval(this.itemShaft.instanceInterval)
    //                 this.$store.commit('setNextCall', true)
    //             } else {
    //                 this.$store.commit('setIntervalItemShaft', true)
    //             }
    //         }, 1000))
    //     },
    //     liftMoveDown(i) {
    //         this.$store.commit('setNextCall', false)
    //         this.$store.commit('setMoveDown', true)
    //         this.$store.commit('setMoveUp', false)
    //         this.$store.commit('setInstanceInterval', setInterval(() => {
    //             this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.itemShaft.interval}px)`
    //             this.$store.commit('setItemCurrentFloor', this.itemShaft.interval)
    //             if (this.itemShaft.interval <= i) {
    //                 this.cahngeRestStatus()
    //                 clearInterval(this.itemShaft.instanceInterval)
    //                 this.$store.commit('setNextCall', true)
    //             } else {
    //                 this.$store.commit('setIntervalItemShaft', false)
    //             }
    //         }, 1000))
    //     },
    //     cahngeRestStatus() {
    //         // ну и тут ставим статус отдыха, который передаем в пропсах в кабину, которая начинает мигать если статус тру, и через три секунды меняем статус на обратный, так же убираем все стрелки и если очередь не пустая, пускаем лифт дальше со статусом котрый не пушит новый вызов а вырезает первый, который уже исполнился и берет следующий
    //         this.$store.commit('setRestStatus', true)
    //         this.$store.commit('setMoveUp', false)
    //         this.$store.commit('setMoveDown', false)
    //         setTimeout(() => {
    //             this.$store.commit('setRestStatus', false)
    //             if (this.getCallQueue.length > 0) {
    //                 this.callElevator(this.getCallQueue[0], false)
    //             }
    //         }, 3000)
    //     }

    //     // похоже что звучит как-то сложновато логически, слишком много тригеров для такого маленького приложения. Но я это признаю и хочу расти и научиться грамотно разрабатывать архитектуру.

    // },
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