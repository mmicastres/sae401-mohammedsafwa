import React, { useState, useEffect } from 'react';
import { useStyletron } from 'baseui';
import { Button, SIZE } from 'baseui/button';
import { Input } from 'baseui/input';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Toast, KIND, ToasterContainer } from "baseui/toast";
import axios from 'axios';

const Admin = () => {
  const token = localStorage.getItem('token');
  const [css] = useStyletron();
  const [insects, setInsects] = useState([]);
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [color, setColor] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    fetchInsects();
  }, []);

  const fetchInsects = () => {
    axios.get('https://laravel.nanodata.cloud/api/insects')
      .then(response => setInsects(response.data))
      .catch(error => console.error("Error fetching insects:", error));
  };

  const addInsect = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('scientificName', scientificName);
    formData.append('color', color); 
    formData.append('height', height); 
    formData.append('weight', weight); 

    if (photoFile) {
      formData.append('photo', photoFile);
    }
    console.log([...formData]);
    console.log(photoFile);

    axios.post('https://laravel.nanodata.cloud/api/insects/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      fetchInsects();
      setName('');
      setScientificName('');
      setPhotoFile(null);
      setToastMsg('Insect added successfully');
      setShowToast(true);
    })
    .catch(error => {
      console.error("Error adding insect:", error);
      console.log(error.response.data);
      setToastMsg(error.response.data.error);
      setShowToast(true);
    });
  };

  const deleteInsect = (id) => {
    axios.delete(`https://laravel.nanodata.cloud/api/insects/delete/${id}`,{
        headers: {
             Authorization: `Bearer ${token}`
          }
    })
      .then(() => {fetchInsects(); setToastMsg('Insect deleted successfully'); setShowToast(true);})
      .catch(error => {console.error("Error deleting insect:", error); setToastMsg(error.message); setShowToast(true);});
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  return (
    <div className={css({ padding: '20px' })}>
      <div className={css({ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
      {showToast && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ToasterContainer>
            <Toast kind={KIND.info}>{toastMsg}</Toast>
          </ToasterContainer>
        </div>
      )}
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Insect Name"
          size={SIZE.compact}
          clearable
          overrides={{ Root: { style: { width: '300px', marginBottom: '10px' } } }}
        />
        <Input
          value={scientificName}
          onChange={e => setScientificName(e.target.value)}
          placeholder="Scientific Name"
          size={SIZE.compact}
          clearable
          overrides={{ Root: { style: { width: '300px', marginBottom: '10px' } } }}
        />
        <Input
            value={color}
            onChange={e => setColor(e.target.value)}
            placeholder="Color"
            size={SIZE.compact}
            clearable
            overrides={{ Root: { style: { width: '300px', marginBottom: '10px' } } }}
        />
        <Input
            value={height}
            onChange={e => setHeight(e.target.value)}
            placeholder="Height"
            size={SIZE.compact}
            clearable
            overrides={{ Root: { style: { width: '300px', marginBottom: '10px' } } }}
        />
        <Input
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="Weight"
            size={SIZE.compact}
            clearable
            overrides={{ Root: { style: { width: '300px', marginBottom: '10px' } } }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <Button onClick={addInsect} size={SIZE.compact}>Add Insect</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {insects.map((insect) => (
          <Card
            key={insect.id}
            title={insect.nom_commun}
            headerImage={insect.photo}
            overrides={{ Root: { style: { width: "328px", margin: '10px' } } }}
          >
            <StyledThumbnail
              src={insect.photo}
              alt={insect.nom_commun}
            />
            <StyledBody>
              {insect.nom_scientifique}
            </StyledBody>
            <StyledAction>
              <Button onClick={() => deleteInsect(insect.id)} kind="minimal" size={SIZE.compact}>Delete</Button>
            </StyledAction>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
