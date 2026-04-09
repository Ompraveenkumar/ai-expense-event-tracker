import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Courier New', Courier, monospace; 
    }

    body {
        background-color: #0a0a0a; /* Cyberpunk Black */
        color: #ffffff;
        overflow-x: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
        background: #00f0ff; /* Neon Cyan */
        border-radius: 4px;
    }
`;