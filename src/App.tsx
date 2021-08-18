import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import FormPage from "./pages/FormPage"

export const App = () => (
  <ChakraProvider theme={theme}>
    <FormPage />
  </ChakraProvider>
)
