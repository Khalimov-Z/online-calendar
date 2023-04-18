import React, { FC } from 'react';
import styled from 'styled-components';
import {Table, Tbody, Td, Tr} from "./shared/Table";

type Props = {
    selectedActive: boolean;
    handleDelete: (event: React.MouseEvent<HTMLSpanElement>) => void;
    handleTodayClick: (event: React.MouseEvent<HTMLSpanElement>) => void;

};

const ControlsTd = styled(Td)`
  width: 50%;
  font-size: 28px;
  color: red;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Today = styled.div`
  text-align: left;
  padding-left: 50px;
  padding-top: 25px;
`;

const TodayText = styled.span`
  cursor: pointer;
`;

const Delete = styled.div`
  text-align: right;
  padding-right: 50px;
  padding-top: 25px;
`;

const DeleteText = styled.span`
  cursor: pointer;
`;

const ControlsBottom: FC<Props> = ({
                                       selectedActive,
                                       handleDelete,
                                       handleTodayClick,
                                   }) => {
    const renderDelete = () => {
        if (selectedActive) {
            return (
                <Delete>
                    <DeleteText onClick={handleDelete}>Delete</DeleteText>
                </Delete>
            );
        } else {
            return <div />;
        }
    };

    return (
        <Table>
            <Tbody>
                <Tr>
                    <ControlsTd>
                        <Today>
                            <TodayText onClick={handleTodayClick}>Today</TodayText>
                        </Today>
                    </ControlsTd>
                    <ControlsTd>{renderDelete()}</ControlsTd>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default ControlsBottom;
