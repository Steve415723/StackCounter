/** @type {HTMLInputElement} */
const stackInput = document.getElementById("stack-input")
/** @type {HTMLInputElement} */
const setInput = document.getElementById("set-input")
/** @type {HTMLInputElement} */
const blockInput = document.getElementById("block-input")
/** @type {HTMLInputElement} */
const stackCountInput = document.getElementById("stack-count-input")

let stackCount = 64
let stackValue = "0"
let setValue = "0"
let blockValue = "0"

const LIMIT_STACK = 9999
let limit = 64 * LIMIT_STACK + stackCount - 1

stackInput.addEventListener("input",() => {
    const value = stackInput.value
    if (value && (isNaN(Number(value)) || value.includes("."))) {
        stackInput.value = stackValue
        return
    }
    if (value.length > 1 && value.startsWith("0")) {
        stackInput.value = value.slice(1)
    }
    if (Number(value) > limit) {
        stackInput.value = String(limit)
    }
    stackValue = stackInput.value
    stackInput.style.width = stackInput.value.length + "ch"
    calcStack("stack")
})

stackInput.addEventListener("focusout",() => {
    const value = stackInput.value
    if (!value) {
        stackInput.value = "0"
        stackValue = "0"
    }
})

setInput.addEventListener("input",() => {
    const value = setInput.value
    if (value && (isNaN(Number(value)) || value.includes("."))) {
        setInput.value = setValue
        return
    }
    if (value.length > 1 && value.startsWith("0")) {
        setInput.value = value.slice(1)
    }
    if (Number(value) > LIMIT_STACK) {
        setInput.value = String(LIMIT_STACK)
    }
    setValue = setInput.value
    setInput.style.width = setInput.value.length + "ch"
    calcStack("set")
})

setInput.addEventListener("focusout",() => {
    const value = setInput.value
    if (!value) {
        setInput.value = "0"
        setValue = "0"
    }
})

blockInput.addEventListener("input",() => {
    const value = blockInput.value
    if (value && (isNaN(Number(value)) || value.includes("."))) {
        blockInput.value = blockValue
        return
    }
    if (value.length > 1 && value.startsWith("0")) {
        blockInput.value = value.slice(1)
    }
    if (Number(value) >= stackCount) {
        blockInput.value = String(stackCount - 1)
    }
    blockValue = blockInput.value
    blockInput.style.width = blockInput.value.length + "ch"
    calcStack("block")
})

blockInput.addEventListener("focusout",() => {
    const value = blockInput.value
    if (!value) {
        blockInput.value = "0"
        blockValue = "0"
    }
})

stackCountInput.addEventListener("input",() => {
    const value = stackCountInput.value
    if (value && (isNaN(Number(value)) || value.includes("."))) {
        stackCountInput.value = String(stackCount)
        return
    }
    if (value.length > 1 && value.startsWith("0")) {
        stackCountInput.value = value.slice(1)
    }
    if (Number(value) > 999) {
        stackCountInput.value = "999"
    }
    stackCount = Number(stackCountInput.value)
    limit = stackCount * LIMIT_STACK + stackCount - 1
    stackCountInput.style.width = stackCountInput.value.length + "ch"
    if (value && value > 0) calcStack("stack")
})

stackCountInput.addEventListener("focusout",() => {
    const value = stackCountInput.value
    if (!value) {
        stackCountInput.value = "64"
        stackCount = 64
        limit = 64 * LIMIT_STACK + 63
        calcStack("stack")
    }
})

/**
 * @param {"stack" | "set" | "block"} changed 
 */
function calcStack(changed) {
    if (changed == "stack") {
        const stack = Number(stackInput.value)
        if (isNaN(stack)) return

        setInput.value = String(Math.floor(stack / stackCount))
        setInput.style.width = setInput.value.length + "ch"
        blockInput.value = String(stack % stackCount)
        blockInput.style.width = blockInput.value.length + "ch"
    }
    else if (changed == "set") {
        const set = Number(setInput.value)
        if (isNaN(set)) return

        stackInput.value = set * stackCount + Number(blockInput.value)
        stackInput.style.width = stackInput.value.length + "ch"
    }
    else if (changed == "block") {
        const block = Number(blockInput.value)
        if (isNaN(block)) return

        stackInput.value = block + Number(setInput.value) * stackCount
        stackInput.style.width = stackInput.value.length + "ch"
    }
}