<template>
    <div class="elevatorshaft-wrapper">
        ElevatorShaft
        <div class="elevatorshaft-wrapper__box">
            <div class="elevatorshaft-wrapper__box-floor" v-for="(item, i) in floors" :key="i" ref="floor">
                <button class="elevatorshaft-wrapper__box-floor-button" @click="callElevator(i, true)"
                    :disabled="item.state || (currentFloor === i && nextCall)">
                    <div class="button-state" v-if="item.state"></div>
                </button>
            </div>
            <ElevatorComponent :floor="this.currentFloor + 1" :rest="restStatus" :moveUp="moveUp" :moveDown="moveDown"
                ref="elevator" />
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
            floorHeigh: 0,
            interval: 0,
            currentFloor: 0,
            callFloor: [],
            instanceInterval: null,
            nextCall: true,
            restStatus: false,
            moveUp: false,
            moveDown: false,
        }
    },
    components: {
        ElevatorComponent
    },
    methods: {
        //нажимаем кнопку вызова, передаем два параметра i - Этаж, bool - булево значение которое определяет вызов идет по нажатию или это вызов из очереди уже нажатой
        callElevator(i, bool) {
            //включаем лампочку на кнопке
            this.floors[i].state = true

            //если нажали из состояния покоя то пушим в очередь, если запустили из очереди, то убираем первый элемент из массива, и выключаем лампочку на этаже
            if (bool) {
                this.callFloor.push(i)
            } else {
                this.callFloor = this.callFloor.slice(1)
                this.floors[i].state = false
            }
            //если состояние покоя отмигалось, то запускаем лифт дальше
            if (!this.restStatus) {
                this.moveLift()
            }

        },
        moveLift() {
            //тут проходимся по очереди этажей, на самом деле можно было просто текущий первый элемент из очереди брать, потому что все равно nextCall становится фолс при запуске любого из условий и цикл дальше не идет, но сначала другая идея реализации была. Это первый кандидат на рефакторинг
            this.callFloor.forEach(item => {
                if (this.nextCall) {
                    //смотрим разница этажей положительная едем вверх, если отрицательная - вниз, позже сделал дизейбл кнопок если кабина на этаже вызова, но функционал уведомления оставил
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
        //движение сделал через трансформ, при запуске метода закрываем возможность циклу идти и тем самым даем остановиться на первом элементе очереди        
        liftMoveUp(i) {             
            this.nextCall = false
            //выбираем направление для стрелок
            this.moveDown = false
            this.moveUp = true
            //запускаем интервал, который смотрит, если аргумент i превышает объявленную переменную, тогда стопим интервал и запускаем функции по остановке и отдыху, и разрешаем некстКолл, иначе прибавляем переменную interval
            this.instanceInterval = setInterval(() => {
                this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.interval}px)`
                this.currentFloor = this.interval
                if (this.interval >= i) {
                    this.cahngeRestStatus()
                    clearInterval(this.instanceInterval)
                    this.nextCall = true
                } else {
                    this.interval++
                }
            }, 1000)
        },
        liftMoveDown(i) {
            this.nextCall = false
            this.moveDown = true
            this.moveUp = false
            this.instanceInterval = setInterval(() => {
                this.$refs.elevator.$el.style.transform = `translate(-50%, -${this.floorHeigh * this.interval}px)`
                this.currentFloor = this.interval
                if (this.interval <= i) {
                    this.cahngeRestStatus()
                    clearInterval(this.instanceInterval)
                    this.nextCall = true
                } else {
                    this.interval--

                }
            }, 1000)
        },
        cahngeRestStatus() {
            // ну и тут ставим статус отдыха, который передаем в пропсах в кабину, которая начинает мигать если статус тру, и через три секунды меняем статус на обратный, так же убираем все стрелки и если очередь не пустая, пускаем лифт дальше со статусом котрый не пушит новый вызов а вырезает первый, который уже исполнился и берет следующий
            this.restStatus = true
            this.moveDown = false
            this.moveUp = false
            setTimeout(() => {
                this.restStatus = false
                if (this.callFloor.length > 0) {
                    this.callElevator(this.callFloor[0], false)
                }
            }, 3000)
        }

        // похоже что звучит как-то сложновато логически, слишком много тригеров для такого маленького приложения. Но я это признаю и хочу расти и научиться грамотно разрабатывать архитектуру.

    },
    mounted() {
        //в маунте задаем размер этажа, чтобы двигать кабину по этому размеру, так, что если верстка этажей поменяется, кабина все равно будет двигаться правильно и будет занимать всю высоту этажа
        this.floorHeigh = this.$refs.floor[0].offsetHeight
        this.$refs.elevator.$el.style.height = this.$refs.floor[0].offsetHeight + 'px'
        this.$refs.elevator.$el.style.width = this.$refs.floor[0].offsetWidth - 5 + 'px'
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