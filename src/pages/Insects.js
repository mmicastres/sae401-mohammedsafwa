import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { Search } from "baseui/icon";
import { Select, Value } from 'baseui/select';
import { useNavigate } from 'react-router-dom';

const Insects = () => {
  const navigate = useNavigate();
  
  const [insects, setInsects] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const search = async (searchValue) => {
    let response = await axios.get(`https://laravel.nanodata.cloud/api/search?q=${searchValue}`)
    setInsects(response.data);
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    axios.get('https://laravel.nanodata.cloud/api/insects')
      .then(response => {
        setInsects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the insects data: ", error);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Input
          startEnhancer={<Search size="18px" />}
          placeholder="Search..."
          onKeyDown={e => {search(e)}}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          overrides={{ Root: { style: { width: '40%' } } }}
        />
      </div>
      
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '20px', 
        overflowY: 'scroll', 
        maxHeight: '80vh',
        margin: '0 auto',
      }}>
        {insects.filter(insect => insect.nom_commun.toLowerCase().includes(searchValue.toLowerCase()))
          .map(insect => (
          <Card
            key={insect.id}
            overrides={{ Root: { style: { width: "328px", marginBottom: '20px', marginRight: '20px', marginLeft: '20px' } } }}
            headerImage={insect.photo}
            title={insect.nom_commun}
          >
            <StyledBody>
              {insect.nom_scientifique}
            </StyledBody>
            <StyledAction>
              <Button 
                onClick={() => navigate(`/insect/${insect.id}`)} 
                overrides={{ BaseButton: { style: { width: "100%" } } }}
              >
                More
              </Button>
            </StyledAction>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Insects;
