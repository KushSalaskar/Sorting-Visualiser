import React, {Component} from 'react';
import'./SortingVisualiser.css';
import { getMergeSortAnimations } from '../Algorithms/mergeSort.js'
import { getHeapSortAnimations } from '../Algorithms/heapSort.js'
import { getQuickSortAnimations } from '../Algorithms/quickSort.js'
import { getBubbleSortAnimations } from '../Algorithms/bubbleSort.js'
import { getSelectionSortAnimations } from '../Algorithms/selectionSort.js'



const PRIMARY = 'turquoise'
const SECONDARY = 'rgb(255, 0, 0)' 
const COMPLETED = 'rgba(78, 216, 96, 1)'
const SPEED_MS = 3
const NUMBER_OF_BARS = 240

class SortingVisualiser extends Component {

    constructor(props){
        super(props)

        this.state = {
            array : [],
            NUMBER_OF_BARS,
            SPEED_MS,
            isRunning: false
        }
        this.changeSize = this.changeSize.bind(this)
        this.changeSpeed = this.changeSpeed.bind(this)
        this.disableButtons = this.disableButtons.bind(this)
        this.activateButtons = this.activateButtons.bind(this)
    } 

    componentDidMount(){
        this.resetArray()
    }

    resetArray(){
        const array = []
        for(let i=0; i<this.state.NUMBER_OF_BARS; i++){
            array.push(generateRandomArray(5,600))
        }
        this.setState({array})
        
    }



    changeSize(e) {

        let value = e.target.value
        this.setState({NUMBER_OF_BARS: value})

        const array = []
        for(let i=0; i<this.state.NUMBER_OF_BARS; i++){
            array.push(generateRandomArray(5,600))
        }
        this.setState({array})

    }

    changeSpeed(e){
        let value = e.target.value
        let newSpeed = 300/(value*value)
        this.setState({SPEED_MS: newSpeed})
    }



    disableButtons() {
        this.setState({isRunning: true})
    }



    activateButtons() {
        this.setState({isRunning: false})
    }


    finishedSorting() {
        const barsOfArray = document.getElementsByClassName('array-bar')
        for(let k = 0; k<this.state.array.length;k++){
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = COMPLETED
            }, this.state.SPEED_MS)
        }
    }
     



    mergeSort() {
        this.disableButtons();
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isAtTarget = animations[i][0] === "select" || animations[i][0] === "deselect";
            const barsOfArray = document.getElementsByClassName('array-bar');
            if(isAtTarget) {
                const [action, barOneIndex, barTwoIndex] = animations[i];
                if((action !== 'select') && (action !== 'deselect')) return
                const color = (animations[i][0] === "select") ? SECONDARY : PRIMARY;
                const barOneStyle = barsOfArray[barOneIndex].style;
                const barTwoStyle = barsOfArray[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.SPEED_MS);
                
            }
            else {
                setTimeout(() => {
                    const [action, barOneIndex, newHeight] = animations[i];
                    if(action !== 'swap') return
                    const barOneStyle = barsOfArray[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * this.state.SPEED_MS);
            }
        }
        const COMPLETE_TIME = parseInt(this.state.SPEED_MS*animations.length + 100)
        setTimeout(() => this.finishedSorting(), COMPLETE_TIME)
        for(let k = 0; k<this.state.array.length;k++){
            const barsOfArray = document.getElementsByClassName('array-bar')
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = PRIMARY
            },COMPLETE_TIME + this.state.SPEED_MS + 1500)
        }
        const TOTAL_ALGORITHM_TIME = COMPLETE_TIME + this.state.SPEED_MS + 1500
        setTimeout(() => this.activateButtons(), TOTAL_ALGORITHM_TIME)
    }




    

    heapSort(){
        this.disableButtons()
        const animations = getHeapSortAnimations(this.state.array)
        const barsOfArray = document.getElementsByClassName('array-bar')
        for(let i = 0; i < animations.length; i++){
            const isAtTarget = (animations[i][0] === 'select') || (animations[i][0] === 'deselect')
            if(isAtTarget){
                const [action, barOneIndex, barTwoIndex] = animations[i]
                if((action !== 'select') && (action !== 'deselect')) return
                const barOneStyle = barsOfArray[barOneIndex].style
                const barTwoStyle = barsOfArray[barTwoIndex].style
                const color = animations[i][0] === 'deselect' ? PRIMARY : SECONDARY
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * this.state.SPEED_MS)
            }else{
                setTimeout(() => {
                    const [action, barOneIndex, newHeightBarOne, barTwoIndex, newHeightBarTwo] = animations[i]
                    if(action !== 'swap') return
                    const barOneStyle = barsOfArray[barOneIndex].style
                    const barTwoStyle = barsOfArray[barTwoIndex].style
                    barOneStyle.height = `${newHeightBarOne}px`
                    barTwoStyle.height = `${newHeightBarTwo}px`
                }, i * this.state.SPEED_MS)
            }
        }
        const COMPLETE_TIME = parseInt(this.state.SPEED_MS*animations.length + 100)
        setTimeout(() => this.finishedSorting(), COMPLETE_TIME)
        for(let k = 0; k<this.state.array.length;k++){
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = PRIMARY
            },COMPLETE_TIME+ this.state.SPEED_MS + 1500)
        }
        const TOTAL_ALGORITHM_TIME = COMPLETE_TIME + this.state.SPEED_MS + 1500
        setTimeout(() => this.activateButtons(), TOTAL_ALGORITHM_TIME)  
    }



    quickSort(){
        this.disableButtons()
        const animations = getQuickSortAnimations(this.state.array)
        const barsOfArray = document.getElementsByClassName('array-bar')
        for(let i = 0; i < animations.length; i++){
            const isAtTarget = (animations[i][0] === 'select') || (animations[i][0] === 'deselect')
            if(isAtTarget){
                const [action, barOneIndex, barTwoIndex] = animations[i]
                if((action !== 'select') && (action !== 'deselect')) return
                const barOneStyle = barsOfArray[barOneIndex].style
                const barTwoStyle = barsOfArray[barTwoIndex].style
                const color = animations[i][0] === 'deselect' ? PRIMARY : SECONDARY
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * this.state.SPEED_MS)
            }else{
                setTimeout(() => {
                    const [action, barOneIndex, newHeightBarOne, barTwoIndex, newHeightBarTwo] = animations[i]
                    if(action !== 'swap') return
                    const barOneStyle = barsOfArray[barOneIndex].style
                    const barTwoStyle = barsOfArray[barTwoIndex].style
                    barOneStyle.height = `${newHeightBarOne}px`
                    barTwoStyle.height = `${newHeightBarTwo}px`
                }, i * this.state.SPEED_MS)
            }
        }
        const COMPLETE_TIME = parseInt(this.state.SPEED_MS*animations.length + 100)
        setTimeout(() => this.finishedSorting(), COMPLETE_TIME)
        for(let k = 0; k<this.state.array.length;k++){
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = PRIMARY
            },COMPLETE_TIME+ this.state.SPEED_MS + 1500)
        }
        const TOTAL_ALGORITHM_TIME = COMPLETE_TIME + this.state.SPEED_MS + 1500
        setTimeout(() => this.activateButtons(), TOTAL_ALGORITHM_TIME)  
    }




    bubbleSort(){
        this.disableButtons()
        const animations = getBubbleSortAnimations(this.state.array)
        const barsOfArray = document.getElementsByClassName('array-bar')
        for(let i = 0; i < animations.length; i++){
            const isAtTarget = (animations[i][0] === 'select') || (animations[i][0] === 'deselect')
            if(isAtTarget){
                const [action, barOneIndex, barTwoIndex] = animations[i]
                if((action !== 'select') && (action !== 'deselect')) return
                const barOneStyle = barsOfArray[barOneIndex].style
                const barTwoStyle = barsOfArray[barTwoIndex].style
                const color = animations[i][0] === 'deselect' ? PRIMARY : SECONDARY
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * this.state.SPEED_MS)
            } else {
                setTimeout(() => {
                    const [action, barOneIndex, newHeightBarOne, barTwoIndex, newHeightBarTwo] = animations[i]
                    if(action !== 'swap') return
                    const barOneStyle = barsOfArray[barOneIndex].style
                    const barTwoStyle = barsOfArray[barTwoIndex].style
                    barOneStyle.height = `${newHeightBarOne}px`
                    barTwoStyle.height = `${newHeightBarTwo}px`
                }, i * this.state.SPEED_MS)
            }
        }
        const COMPLETE_TIME = parseInt(this.state.SPEED_MS*animations.length + 100)
        setTimeout(() => this.finishedSorting(), COMPLETE_TIME)
        for(let k = 0; k<this.state.array.length;k++){
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = PRIMARY
            },COMPLETE_TIME + this.state.SPEED_MS + 1500)
        } 
        const TOTAL_ALGORITHM_TIME = COMPLETE_TIME + this.state.SPEED_MS + 1500
        setTimeout(() => this.activateButtons(), TOTAL_ALGORITHM_TIME) 
    }



    selectionSort(){
        this.disableButtons()
        const animations = getSelectionSortAnimations(this.state.array)
        const barsOfArray = document.getElementsByClassName('array-bar')
        for(let i = 0; i < animations.length; i++){
            const isAtTarget = (animations[i][0] === 'select') || (animations[i][0] === 'deselect')
            if(isAtTarget){
                const [action, barOneIndex, barTwoIndex] = animations[i]
                if((action !== 'select') && (action !== 'deselect')) return
                const barOneStyle = barsOfArray[barOneIndex].style
                const barTwoStyle = barsOfArray[barTwoIndex].style
                const color = animations[i][0] === 'deselect' ? PRIMARY : SECONDARY
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * this.state.SPEED_MS)
            } else {
                setTimeout(() => {
                    const [action, barOneIndex, newHeightBarOne, barTwoIndex, newHeightBarTwo] = animations[i]
                    if(action !== 'swap') return
                    const barOneStyle = barsOfArray[barOneIndex].style
                    const barTwoStyle = barsOfArray[barTwoIndex].style
                    barOneStyle.height = `${newHeightBarOne}px`
                    barTwoStyle.height = `${newHeightBarTwo}px`
                }, i * this.state.SPEED_MS)
            }
        }
        const COMPLETE_TIME = parseInt(this.state.SPEED_MS*animations.length + 100)
        setTimeout(() => this.finishedSorting(), COMPLETE_TIME)
        for(let k = 0; k<this.state.array.length;k++){
            setTimeout(() => {
                barsOfArray[k].style.backgroundColor = PRIMARY
            },COMPLETE_TIME + this.state.SPEED_MS + 1500)
        } 
        const TOTAL_ALGORITHM_TIME = COMPLETE_TIME + this.state.SPEED_MS + 1500
        setTimeout(() => this.activateButtons(), TOTAL_ALGORITHM_TIME) 
    }

    


    render(){
        const {array} = this.state
        return(
            <div>
            <div className = "array-container">
                {array.map((value, id) => (
                    <div 
                    className = "array-bar"
                    key = {id}
                    style = {{
                        backgroundColor:PRIMARY,
                        height: `${value}px`,
                        width: `${parseInt(720/this.state.NUMBER_OF_BARS)}px`
                    }}>
                    </div>
                ))}
                </div>
                <div className = "bottom-bar">
                <button className={this.state.isRunning ? 'disabled-button' : 'reset-button'} disabled={this.state.isRunning} onClick={() => this.resetArray()}>Reset Array</button>
                <button className={this.state.isRunning ? 'disabled-button': 'algo-button'} disabled={this.state.isRunning} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button className={this.state.isRunning ? 'disabled-button': 'algo-button'} disabled={this.state.isRunning} onClick={() => this.selectionSort()}>Selection Sort</button>
                <button className={this.state.isRunning ? 'disabled-button': 'algo-button'} disabled={this.state.isRunning} onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className={this.state.isRunning ? 'disabled-button': 'algo-button'} disabled={this.state.isRunning} onClick={() => this.heapSort()}>Heap Sort</button>
                <button className={this.state.isRunning ? 'disabled-button': 'algo-button'} disabled={this.state.isRunning} onClick={() => this.quickSort()}>Quick Sort</button>
                <label>Size: <input disabled={this.state.isRunning} type="range" min="10" max="240" value={this.state.NUMBER_OF_BARS} onChange={this.changeSize} ></input></label>
                <label>Speed: <input disabled={this.state.isRunning} type="range" min ="1" max="15" onChange={this.changeSpeed}></input></label>
                </div>
                </div>
            
        );
    }
}

function generateRandomArray (min, max) {
    return Math.floor(Math.random()*(max-min+1)+(min))
}

export default SortingVisualiser



