import React, { Component } from 'react';
import './App.css';

function Square(props)
{
	let nameOfClass;
	if(props.number === null)
	{
		nameOfClass = "blankSquare";
	}
	else
	{
		nameOfClass = "square";
	}
	return (
		<button className={nameOfClass} id={props.id} onClick={props.onClick}>
			{props.number}
		</button>
	);
}

class Board extends Component
{
	newSquare(num)
	{
		return (
			<Square
				id={this.props.id[num]} 
				onClick={() => {this.props.onClick(num)}} 
				number={this.props.numbers[num]} 
			/>
		);
	}
	
	render()
	{
		let rows = [];
		for(let i = 0; i < 4; i++)
		{
			let newRow = [];
			for(let j = 0; j < 4; j++)
			{
				newRow.push(this.newSquare(4*j+i));
			}
			rows.push(<div className="board-row">{newRow}</div>);
		}
		return (
			<div className="board">
				{rows}
			</div>
		);
	}
}

function doArray(size)
{
	let newArray = Array(size).fill(null);
	for(let i = 0; i < size; i++)
	{
		newArray[i] = i+1;
	}
	return newArray;
}

function doRandomArray(size)
{
	let randomArray = Array(size).fill(null);
	let czy = Array(size).fill(false)
	let i = 0;
	while(i !== size-1)
	{
		let rand = Math.floor(Math.random()*size);
		if(czy[rand] === false && rand !== size && rand !== 0)
		{
			randomArray[i] = rand;
			czy[rand] = true;
			i++;
		}
	}
	return randomArray;
}

function Refresh(props)
{
	return (
		<button className="refresh" onClick={props.onClick}>
			Nowa gra
		</button>
	);
}

class App extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			id: doArray(16),
			numbers: doRandomArray(16),
			sign: 'Gra ciągle trwa',
			trwa: true,
			moves: 0,
		};
		this.clickHandler = this.clickHandler.bind(this);
	}
	
	refreshHandler()
	{
		document.location.reload();
	}
	
	clickHandler(i)
	{
		let numbers = this.state.numbers;
		let sign = this.state.sign;
		let trwa = this.state.trwa;
		let moves = this.state.moves;
		
		if(trwa === false)
		{
			return;
		}
		
		if(i%4 !== 0 && numbers[i-1] === null)
		{
			numbers[i-1] = numbers[i];
			numbers[i] = null;
			moves++;
		}
		if(i%4 !== 3 && numbers[i+1] === null)
		{
			numbers[i+1] = numbers[i];
			numbers[i] = null;
			moves++;
		}
		if(i-4 >= 0 && numbers[i-4] === null)
		{
			numbers[i-4] = numbers[i];
			numbers[i] = null;
			moves++;
		}
		if(i+4 <= 15 && numbers[i+4] === null)
		{
			numbers[i+4] = numbers[i];
			numbers[i] = null;
			moves++;
		}
		
		let czy = true;
		
		for(let j = 0; j < 15; j++)
		{
			if(numbers[j] !== this.state.id[j])
			{
				czy = false;
				break;
			}
		}
		
		if(czy === true)
		{
			sign = 'Koniec!'
			trwa = false;
		}
		
		this.setState({
			numbers: numbers,
			sign: sign,
			trwa: trwa,
			moves: moves
		});
	}
	
  render() {
    return (
		<div>
			<div className="top">
				<div className="banner">
					<h1>{this.state.sign} <br />
					Wykonane ruchy: {this.state.moves}</h1>
				</div>
				<div className="newgame">
					<Refresh onClick={this.refreshHandler} />
				</div>
			</div>
			<Board 
				numbers={this.state.numbers} 
				id={this.state.id} 
				onClick={(i) => this.clickHandler(i)} 
			/>
		</div>
    );
  }
}

export default App;