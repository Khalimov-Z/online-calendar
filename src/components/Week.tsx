import React from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import TimeOfDay from './TimeOfDay';
import { Table, Tbody, Tr, Td } from './shared/Table';

type Props = {
    date: moment.Moment;
    eventDates: { [key: string]: any };
    handleSelect: (e: React.MouseEvent<HTMLTableDataCellElement>) => void;
    selectedStartDate?: Moment|null;
};

const startHour = 0;
const endHour = 24;

const TdTimeLabel = styled(Td)`
  border: 2px solid transparent;
  position: relative;
`;

const TdTimeLabelText = styled.div`
  position: absolute;
  bottom: -15px;
  right: 10px;
  z-index: 1;
  color: ${(props) => props.theme.calendar_time_color};
  font-size: 18px;
  @media (max-width: 600px) {
    bottom: -9px;
    font-size: 12px;
  }
`;

const Week: React.FC<Props> = ({ date, eventDates, handleSelect, selectedStartDate }) => {
    const startOfWeek = moment(date).startOf('isoWeek');

    const TimesOfDays: React.ReactElement[][] = [];
    for (let cur_hour = startHour +1; cur_hour <= endHour; cur_hour++) {
        let row: React.ReactElement[] = [];

        row.push(
            <TdTimeLabel key={-1}>
                {' '}
                <TdTimeLabelText>
                    {cur_hour !== startHour && cur_hour !== endHour ? cur_hour.toString().padStart(2, '0') + ':00' : ''}
                </TdTimeLabelText>
            </TdTimeLabel>
        );

        for (let week_day = 0; week_day < 7; week_day++) {
            let date = moment(startOfWeek).add(week_day, 'days').add(cur_hour, 'hours');

            let date_str = date.format('YYYY-MM-DD');
            row.push(
                <TimeOfDay
                    key={week_day}
                    event_dates={date_str in eventDates ? eventDates[date_str] : []}
                    date={date}
                    handleSelect={handleSelect}
                    selectedStartDate={selectedStartDate}
                />
            );
        }
        TimesOfDays.push(row);
    }

    return (
        <Table>
            <Tbody>
                {TimesOfDays.map((row, i) => (
                    <Tr key={i}>{row}</Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Week;