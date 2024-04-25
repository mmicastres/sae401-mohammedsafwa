import React from 'react';
import { Button } from 'baseui/button';
import { HeadingXXLarge, ParagraphLarge } from 'baseui/typography';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-monolithic";
import { useNavigate } from 'react-router-dom';
import HomeCSS from './Home.css'

import dragonflyImage from "./images/dragonfly.png"
import butterflyImage from "./images/butterfly.png"

const engine = new Styletron();

const Home = () => {
  const [css, theme] = useStyletron();

  const navigate = useNavigate();

  const goToInsects = () => {
    navigate('/insects'); 
  };
  
  
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <img src={dragonflyImage} alt="Dragonfly" className="dragonfly" />  
        <img src={butterflyImage} alt="Butterfly" className="butterfly" />

        <Block
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Block 
            alignSelf="flex-start"
            paddingLeft={theme.sizing.scale800}
            marginBottom={theme.sizing.scale600}
          >
            <HeadingXXLarge
              $style={{
                textAlign: 'center',
                fontSize: '64px',
              }}
            >
              Welcome to insecti<span style={{ color: 'green' }} className={css({ color: theme.colors.positive })}>Dex</span>
            </HeadingXXLarge>
          </Block>

          <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            marginBottom={theme.sizing.scale800}
          >
            <ParagraphLarge>
              "Discover the fascinating world of insects with our innovative application.
              Capture, collect, and explore their essential role in the ecosystem."
            </ParagraphLarge>
          </Block>

          <Button 
            onClick={goToInsects}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '250px',
                  height: '50px',
                  backgroundColor: $theme.colors.positive,
                  fontSize: $theme.sizing.scale600,
                  ':hover': {
                    backgroundColor: $theme.colors.positive700,
                  },
                }),
              },
            }}
          >
            Start
          </Button>
        </Block>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default Home;