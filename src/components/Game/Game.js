import { Component, createRef } from 'react'
import axios from 'axios'
import { API_URL } from '../../helpers/constants/apiUrl'
import Fallback from '../Fallback/Fallback';
import ErrorView from '../ErrorView/ErrorView';
import Area from '../Area/Area';
import Select from 'react-select';

import './Game.css';

export class Game extends Component {

  constructor(props){
    super(props)
    this.state = {
      appModes: null,
      currentMode: null,
      error: null,
      history: []
    };
    this.historyListRef = createRef();
  }

  fetchAppMode = async ()=>{
    try {
      const {data} = await axios.get(API_URL);
      this.setState({ appModes: data });
    } catch (error) {
      this.setState({error});
    }
  }

  componentDidMount(){
    this.fetchAppMode();
  }
  componentDidUpdate(_, prevState){
    if(prevState.currentMode !== this.state.currentMode){
      this.setState({ history: [] });
    }
    if(prevState.history.length !== this.state.history.length){
      this.historyListRef.current.scrollTop = this.historyListRef.current.scrollHeight;
    }
  }

  selectOptions = [
    {value: "easyMode", label: "Easy"},
    {value: "normalMode", label: "Normal"},
    {value: "hardMode", label: "Hard"},
  ]

  handleSelectChange = (option)=>{
    this.setState({ currentMode: option.value });
  }

  handleHover = (row, col)=>{
    this.setState({
      history: [...this.state.history, {row, col}]
    });
  }

  render() {
    const { appModes, currentMode, error } = this.state;
    if(!this.state.appModes) return <Fallback/>;
    if(error) return <ErrorView error={error}/>;
    return (
      <div className="game">
        <div className="game__left">
        <div className="app_mode">
          <p className="app_mode__header">App mode:</p>
          <Select
            placeholder="Select app mode..."
            className="app_mode__select"
            options={this.selectOptions}
            onChange={this.handleSelectChange}
          />
        </div>
        {!!currentMode && <Area handleHover={this.handleHover} size={appModes?.[currentMode].field}/>}
        </div>
        <div className="game__right game_history">
          <h3 className="game_history__header">Hover Squares</h3>
          <ul className="game_history__list" ref={this.historyListRef}>
            {this.state.history.map(({row, col}, i)=>(
              <li 
                className="game_history__item"
                key={`game_history__item-${i}`}
              >
                {`Row ${row+1} Col ${col+1}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Game
