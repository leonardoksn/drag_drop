import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Apenas } from './Apenas'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <ChakraProvider>
      <Apenas />
    </ChakraProvider>
  // </React.StrictMode>
)
