import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FluentProvider,
  webLightTheme,
  Button
} from "@fluentui/react-components";



function App() {
  return (
    <FluentProvider theme={webLightTheme}>
              <Button>Hello Fluent UI React</Button>
    </FluentProvider>
  );
}

export default App;
