import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment, { Moment } from 'moment';

import { GlobalStyle } from './theme/globalStyle';

import Header from './Header';
import Nav from './Nav';
import Week from './Week';
import ControlsBottom from './ControlsBottom';

import { defaultTheme } from './theme/defaultTheme';

interface EventDates {
    [date: string]: Moment[];
}


const CalendarWrapper = styled.div`
  text-align: center;
  max-width: 740px;
  background-color: ${(props) => props.theme.calendar_bg};
  margin: auto;
  position: relative;
`;

const CalendarNav = styled.div`
  background-color: ${(props) => props.theme.calendar_control_bg};
  border-top: 2px solid ${(props) => props.theme.calendar_border};
  border-bottom: 2px solid ${(props) => props.theme.calendar_border};
  position: fixed;
  z-index: 99;
  top: 80px;
  max-width: 740px;
  width: 100%;
`;

const CalendarMain = styled.div`
  margin-top: 140px;
  margin-bottom: 70px;
  @media (max-width: 600px) {
    margin-top: 100px;
  }
`;

const CalendarBottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 740px;
  height: 80px;
  z-index: 99;
  background-color: ${(props) => props.theme.calendar_control_bg};
`;

const Calendar: React.FC= () => {
    const [date, setDate] = useState<Moment>(moment());
    const [eventDates, setEventDates] = useState<EventDates>({});
    const [selectedStartDate, setSelectedStartDate] = useState<Moment | null>(
        null
    );
    const [selectedActive, setSelectedActive] = useState<boolean>(false);
    const changeDay = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
        setDate(moment(event.currentTarget.getAttribute('data-date')));
    };

    const prevWeek = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDate(moment(date).subtract(1, 'week'))
        console.log("клик")
    };

    const nextWeek = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDate(moment(date).add(1, 'week'));
        console.log("клик")
    };

    const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        setSelectedStartDate(moment(event.currentTarget.getAttribute('data-start-date')));
        setSelectedActive(!!event.currentTarget.getAttribute('data-active') &&
        !!eventDates[moment(event.currentTarget.getAttribute('data-start-date')).format('YYYY-MM-DD')]);
    };

    const createEvent = (event: React.MouseEvent<HTMLDivElement>): void => {
        const inputString: string | null = window.prompt(
            'Enter event time: YYYY-MM-DD HH:mm:ss',
            moment().format('YYYY-MM-DD HH:mm:ss')
        );

        if (inputString) {
            const newEvent: Moment = moment(inputString, 'YYYY-MM-DD HH:mm:ss', true);

            if (newEvent.isValid()) {
                const newEventStr: string = newEvent.format('YYYY-MM-DD');
                setEventDates((prevEventDates: EventDates) => ({
                    ...prevEventDates,
                    [newEventStr]:
                        newEventStr in prevEventDates
                            ? [newEvent, ...prevEventDates[newEventStr]]
                            : [newEvent],
                }));
            } else {
                alert('Date is invalid');
            }
        }
    };

    const handleTodayClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        setDate(moment());
    };

    const handleDelete = (event: React.MouseEvent<HTMLSpanElement>): void => {
        if (selectedStartDate && selectedActive) {
            const dateStr: string = selectedStartDate.format('YYYY-MM-DD');
            const events: Moment[] = [];
            for (let date of eventDates[dateStr]) {
                const differenceFromStart: number = moment(selectedStartDate).diff(
                    date,
                    'minutes'
                );

                if (differenceFromStart > 0 || differenceFromStart <= -60) {
                    events.push(date);
                }
            }

            let newEventDates: EventDates = { ...eventDates };
            newEventDates[dateStr] = events;
            setEventDates(newEventDates);
            setSelectedStartDate(null);
            setSelectedActive(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <CalendarWrapper>
                <Header createEvent={createEvent}/>
                <CalendarNav>
                    <Nav
                        changeDay={changeDay}
                        prevWeek={prevWeek}
                        nextWeek={nextWeek}
                        date={date}
                    />
                </CalendarNav>
                <CalendarMain>
                    <Week
                        eventDates={eventDates}
                        date={date}
                        handleSelect={handleSelect}
                        selectedStartDate={selectedStartDate}
                    />
                </CalendarMain>
                <CalendarBottom>
                    <ControlsBottom
                        handleTodayClick={handleTodayClick}
                        selectedActive={selectedActive}
                        handleDelete={handleDelete}
                    />
                </CalendarBottom>
            </CalendarWrapper>
        </ThemeProvider>
    );
};

export default Calendar;