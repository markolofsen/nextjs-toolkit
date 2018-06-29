import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';



const styles = mui => ({
  buttonSubmit: {
      padding: '15px 20px',
      marginTop: 0,
  },
  buttonSubmitColored: {
      background: 'red',
  },


  buttonColored: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 50,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  buttonColoredOutline: {
      border: 'solid 1px #FE6B8B',
      borderRadius: 50,
      height: 48,
      padding: '0 30px',
      backgroundColor: 'transparent',
      // transition: `transition: background 2s ease`,
      "&:hover": {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
  },
  buttonColoredLabel: {
    textTransform: 'normal',
  },
});

class FormButton extends Component {

    state = {}

    // buttonClick = () => {
    //     if(this.props.onClick) {
    //         this.props.onClick()
    //     }
    // }

	render() {

        const {classes, disabled, type, label} = this.props

        let applyClass = ""
        let applyClasses = {}
        let appplyColor = "inherit"
        if(this.props.variant == 'colored') {
            applyClass = ""
            applyClasses = {
                root: classes.buttonColored, // class name, e.g. `classes-root-x`
                label: classes.buttonColoredLabel, // class name, e.g. `classes-label-x`
            }
        } else if(this.props.variant == 'colored-outline') {
            applyClass = ""
            applyClasses = {
                root: classes.buttonColoredOutline, // class name, e.g. `classes-root-x`
                label: classes.buttonColoredLabel, // class name, e.g. `classes-label-x`
            }
        } else if(this.props.variant) {
            applyClass = classes.buttonSubmit
            appplyColor = this.props.variant
        } else {
            applyClass = classes.buttonSubmit
            appplyColor = 'primary'
        }

        let fullWidth = {}
        if(this.props.fullWidth) {
            fullWidth = {
                width: '100%',
                display: 'block',
            }
        }

        // onClick={this.buttonClick}

		return (
			<div>
                <Button
                    disabled={disabled}
                    type={type}
                    variant="raised"
                    size="large"
                    color={appplyColor}
                    className={applyClass}
                    classes={applyClasses}
                    style={fullWidth}
                    onClick={this.props.onClick}
                    {...this.other}
                    >
                  <span dangerouslySetInnerHTML={{__html: label}} />
                </Button>
            </div>
		)
	}
}

FormButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(FormButton)
