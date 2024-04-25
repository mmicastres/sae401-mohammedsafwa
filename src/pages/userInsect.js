import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { ChevronDown, Delete, Overflow } from 'baseui/icon';
import { useNavigate } from 'react-router-dom';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-monolithic';

const engine = new Styletron();

const UserInsects = () => {
  const navigate = useNavigate();
  const [css] = useStyletron();
  const [mainItems, setMainItems] = useState([
    { icon: Overflow, label: 'My Collection', active: true },
    { icon: Delete, label: 'My Account' },
  ]);
  const [userInsects, setUserInsects] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get('https://laravel.nanodata.cloud/api/insects/user/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (Array.isArray(response.data.insects)) {
          setUserInsects(response.data.insects);
        } else {
          console.error("Expected an array of insects, received:", response.data);
        }
      })
      .catch(error => console.error("Error fetching insects:", error));
  }, []);

  const handleNav = (item) => {
    if (item.label === 'My Collection') {
      navigate('/myinsects');
    } else if (item.label === 'My Account') {
      navigate('/myaccount');
    }
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <AppNavBar
          title="Insect Collection"
          mainItems={mainItems}
          onMainItemSelect={item => {
            setItemActive(mainItems, item);
            handleNav(item); 
            console.log(item.label);
          }}
        />
        <div className={css({
          padding: '20px',
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '20px', 
          overflowY: 'scroll', 
          maxHeight: '80vh',
          margin: '0 auto', 
        })}>
          {userInsects.length === 0 ? (
            <p>No insects in your collection!</p>
          ) : (
            userInsects.map(insect => (
              <Card
                key={insect.id}
                overrides={{ Root: { style: { width: "328px", marginBottom: '20px' } } }}
                headerImage={insect.photo}
                title={insect.nom_commun}
              >
                <StyledBody>{insect.nom_scientifique}</StyledBody>
                <StyledAction>
                  <Button 
                    onClick={() => navigate(`/insect/${insect.id}`)}
                    overrides={{ BaseButton: { style: { width: "100%" } } }}
                  >
                    More
                  </Button>
                </StyledAction>
              </Card>
            ))
          )}
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default UserInsects;
