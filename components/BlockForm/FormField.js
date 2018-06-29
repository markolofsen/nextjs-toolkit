import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input, { InputLabel } from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix={props.prefix}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};



const styles = mui => ({
  formControl: {
      width: '100%',
      marginBottom: 10,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: mui.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 2,
    backgroundColor: mui.palette.common.white,
    border: '1px solid rgba(63, 81, 181, .2)',
    fontSize: 18,
    padding: '15px 20px',
    // width: 'calc(100% - 24px)',
    width: '100%',
    transition: mui.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: 'rgba(63, 81, 181, .5)',
      boxShadow: '0 0 0 0.2rem rgba(63, 81, 181,.25)',
    },
  },
  textAFieldTextareaRoot: {
  },
  textAFieldTextarea: {
      boxSizing: 'border-box',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  formHelper: {
      marginBottom: 10,
  },
});

class FormField extends Component {

    state = {}


	render() {

        const {classes, state_name, state_value, label, type, multiline=false, required, disabled, error, placeholder=false, autoFocus} = this.props
        const error_id = `field-${state_name}-error`
        const field_id = `field-${state_name}`

        let placeholder_ = placeholder ? placeholder : label


        let InputProps_ = {
          disableUnderline: true,
          classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
            multiline: classes.textAFieldTextareaRoot,
            inputMultiline: classes.textAFieldTextarea,
          },
        }


        let type_ = type
        if(type == 'money') {
            type_ = 'text'
            InputProps_['inputComponent'] = NumberFormatCustom
            InputProps_['autoComplete'] = 'off'

            InputProps_['inputProps'] = {
              'aria-label': '',
              // 'prefix': '',
            }
        }

		return (
			<div>
                <FormControl className={classes.formControl} error={error ? true : false} aria-describedby={error_id}>
                    <TextField
                        placeholder={placeholder_}
                        defaultValue=""
                        label={label}
                        value={state_value}
                        id={field_id}
                        type={type_}
                        required={required}
                        disabled={disabled}
                        multiline={multiline}
                        rowsMax="40"
                        rows="8"
                        InputProps={InputProps_}
                        InputLabelProps={{
                          shrink: true,
                          className: classes.textFieldFormLabel,
                        }}
                        onChange={(event) => this.props.onChange(event, state_name)}
                        onClick={this.props.onClick}
                        autoFocus={autoFocus}
                      />
                    {error && <FormHelperText className={classes.formHelper} id={error_id}>{error}</FormHelperText>}
                </FormControl>
            </div>
		)
	}
}

FormField.propTypes = {
  state_name: PropTypes.string.isRequired,
  state_value: PropTypes.any.isRequired,
  // label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormField)
