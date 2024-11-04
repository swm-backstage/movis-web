import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 10px;
    vertical-align: baseline;
  }

  body {
    line-height: 1;
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: #FFFF;
    margin-bottom: 100px;
  }

  ol, ul {
    list-style: none;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  html, body {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  /* Firefox */
  html {
    scrollbar-width: none;
  }

  /* Chrome, Safari, Edge, Opera */
  html::-webkit-scrollbar {
    display: none;
  }
`