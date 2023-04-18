import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        body_bg: string;
        calendar_bg: string;
        calendar_control_bg: string;
        calendar_border: string;
        calendar_time_color: string;
        active_time_color: string;
        selected_time_color: string;
    }
}

export const defaultTheme :DefaultTheme = {
    body_bg: '#ccc',
    calendar_bg: '#fff',
    calendar_control_bg: '#eee',
    calendar_border: '#e6e6e6',
    calendar_time_color: '#c0c0c0',
    active_time_color: '#ebecff',
    selected_time_color: '#b3b7ff'
};