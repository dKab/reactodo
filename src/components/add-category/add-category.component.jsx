import { connect } from 'react-redux';
import AddItem from '../add-item/add-item.component';
import { addCategory } from '../../actions';

const mapStateToProps = () => {
    return {
        placeholder: 'Enter category name'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onButtonClick: (name) => {
            dispatch(addCategory(name, null))
        }
    }
};

const AddCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddItem);

export default AddCategory;