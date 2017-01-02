import {connect} from 'react-redux';
import React from 'react';
import {redo, undo} from '../../actions';

const UndoRedo = ({past, future, onUndoClick, onRedoClick}) => {
    return (
        <div className="undo-redo">
            <button className="btn" onClick={onUndoClick} disabled={!past.length}>Undo</button>
            <button className="btn" onClick={onRedoClick} disabled={!future.length}>Redo</button>
        </div>
    );
};

const mapStateToProps = (state) => {
   return {
        past: state.past,
        future: state.future
    };
};

const mapDispatchToProps = (dispatch) => {
   return {
       onUndoClick: () => dispatch(undo()),
       onRedoClick: () => dispatch(redo())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);