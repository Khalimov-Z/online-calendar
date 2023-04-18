import React from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

import { Td } from './shared/Table';

const TdEvent = styled(Td)<{ selected?: boolean }>`
  border: 2px solid ${(props) => props.theme.calendar_border};
  ${({ selected }) =>
    selected &&
    `
    background-color:#b3b7ff ;
  `}
`;

const TdEventActive = styled(TdEvent)<{ selected?: boolean }>`
  background-color: #ebecff;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    `
    background-color:#b3b7ff ;
  `}
`;

type Props = {
    date: Moment;
    event_dates: string[];
    handleSelect: (event: React.MouseEvent<HTMLTableDataCellElement>) => void;
    selectedStartDate?: Moment|null;
    week_day?: number;
};

const TimeOfDay: React.FC<Props> = ({
                                        date,
                                        event_dates,
                                        handleSelect,
                                        selectedStartDate,
                                        week_day,
                                    }) => {
    const startDate = moment(date).subtract(1, 'hours');
    const startDateCompare = moment(date).subtract(1, 'hours').subtract(1, 'seconds');
    const endDate = date;

    for (let cur_event of event_dates) {
        if (moment(cur_event).isBetween(startDateCompare, endDate)) {
            return (
                <TdEventActive
                    onClick={handleSelect}
                    data-start-date={moment(startDate).toISOString(true)}
                    selected={selectedStartDate?.isSame(startDate)}
                    data-active={true}
                />
            );
        }
    }

    return (
        <TdEvent
            onClick={handleSelect}
            data-start-date={moment(startDate).toISOString(true)}
            selected={moment(selectedStartDate).isSame(startDate)}
            data-active={false}
        >
            {week_day}
        </TdEvent>
    );
};

export default TimeOfDay;