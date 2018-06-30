import React, {Component} from 'react';
import PropTypes from 'prop-types';

import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import datepickerCSS from '../../../node_modules/react-dates/lib/css/_datepicker.css';
// import './theme.scss'

import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
const _ = require('lodash');
import {isBrowser, isMobile} from 'react-device-detect';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            calendarFocused: null,
        };
    }

    isDayBlocked = (day) => {
        const { data } = this.props;

        if(data.length==0) {
            return false
        }


        let response = true
        data.map((item, index) => {

            if(item.weekday == day.weekday()) {
                response = false
                return true
            }
        })
        return response

    }


    isOutsideRange = (day) => {
        let prev = moment().add(1, 'days');
        let next = moment().add(1, 'years');
        if(prev.diff(day) > 0 || day.diff(next) > 0) {
            return true
        }
    }


    onDateChange = (date) => {
        const {data} = this.props
        this.setState(() => ({ date }));

        let times = []
        for(let i=0; i<data.length; i++) {
            if(data[i].weekday == date.weekday()) {
                times = data[i].times
                break
            }
        }

        this.props.onChange({
            weekday: date.weekday(),
            date: date.format('YYYY-MM-DD'),
            times: times,
        })

    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };


    render() {

        const {date} = this.state

        // console.log( this.props.data )

        return (
            <div>
                <SingleDatePicker
                  date={this.state.date}
                  focused={this.state.calendarFocused}
                  onDateChange={this.onDateChange}
                  onFocusChange={this.onFocusChange}
                  isDayBlocked={this.isDayBlocked}
                  isOutsideRange={this.isOutsideRange}
                  numberOfMonths={isBrowser ? 2 : 1}
                  firstDayOfWeek={1}
                  block
                />
            </div>
        )
    }
}



DatePicker.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DatePicker;
