import {createGlobalStyle, DefaultTheme} from 'styled-components';

export const GlobalStyle = createGlobalStyle <{ theme: DefaultTheme }>`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.body_bg};
    font-family: Roboto, sans-serif;
  }
`;