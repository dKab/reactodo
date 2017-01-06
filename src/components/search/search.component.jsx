import React from 'react';
import {connect} from 'react-redux';
import {push} from '../../actions';
import './search.css';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            phrase : props.phrase || ''
        };

        this.onInputValueChange = this.onInputValueChange.bind(this);
    }

    onInputValueChange(e) {
        const newText = e.target.value;
        this.setState({phrase : newText});
    }

    clearInput() {
        this.setState({phrase: ''});
        this.props.onSearchClear();
    }

    render() {
        return (<div className="search">
                <label><input checked={this.props.showDone} onChange={this.props.onCheckboxToggle} type="checkbox"/>Show done</label>
                <input placeholder="Search" type="text"
                       className="search__input" value={this.state.phrase} onChange={this.onInputValueChange}
                       onKeyUp={(e) => this.props.onPhraseChange(e, this.state.phrase)} />
                <span className="search__clear" onClick={this.clearInput.bind(this)}>&times;</span>
            </div>
        );
    }
}
export const SHOW_DONE_DEFAULT_VALUE = false;

export const YES = 'y';
export const NO = 'n';
export const valueURLMap = new Map([[true, YES], [false, NO]]);
export const URLValueMap = new Map([[YES, true], [NO, false]]);


const mapStateToProps = (state, ownProps) => {
    const showDone = ownProps.location.query.showDone;
    return {
        showDone: showDone ? URLValueMap.get(showDone) : SHOW_DONE_DEFAULT_VALUE ,
        phrase: ownProps.location.query.searchPhrase
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const urlParam = ownProps.location.query.showDone,
        showDone = !!URLValueMap.get(urlParam);
    return {
        onCheckboxToggle: () => {
            dispatch(push({...ownProps.location, query: {...ownProps.location.query, showDone: valueURLMap.get(!showDone)}}));
        },
        onPhraseChange: (e, phrase) => {
            if (e.key === 'Enter') {
                dispatch(push({...ownProps.location, query: {...ownProps.location.query, searchPhrase: phrase}}));
            }
        },
        onSearchClear: () => {
            dispatch(push({...ownProps.location, query: {...ownProps.location.query, searchPhrase: '' }}));
        }
    };
};

export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);