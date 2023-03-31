function dispRot (p_speed: number) {
    led.unplot(pattern, 0)
    if (p_speed > 0) {
        pattern += 1
    } else {
        pattern += -1
    }
    if (pattern > 4) {
        pattern = 0
    }
    led.plot(pattern, 0)
    basic.pause(Math.abs(p_speed))
}
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    Hi = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    Lo = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
})
let pattern = 0
let Hi = 0
let Lo = 0
let speed = 500
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 100)
Lo = 0
Hi = 0
pins.setEvents(DigitalPin.P2, PinEventType.Pulse)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        speed += 10
    }
    if (input.buttonIsPressed(Button.B)) {
        speed += -10
    }
    if (speed > 1000) {
        speed = 1000
    }
    if (speed < 0) {
        speed = 0
    }
    pins.analogWritePin(AnalogPin.P0, speed)
    serial.writeNumbers([
    speed,
    Hi,
    Lo,
    Hi / (Hi + Lo)
    ])
    basic.pause(100)
})
