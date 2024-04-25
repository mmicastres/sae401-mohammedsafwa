import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Button } from "baseui/button";
import { HeadingXXLarge, ParagraphLarge } from 'baseui/typography';
import { Check, Delete, Overflow, TriangleUp } from 'baseui/icon';

const Insect = () => {
  const { id } = useParams();
  const [insect, setInsect] = useState(null);
  const navigate = useNavigate();
  const [css] = useStyletron();

  useEffect(() => {
    axios.get(`https://laravel.nanodata.cloud/api/insect/${id}`)
      .then(response => {
        setInsect(response.data[0]); 
      })
      .catch(error => {
        console.error("There was an error fetching the insect details: ", error);
      });
  }, [id]);

  if (!insect) {
    return <div>Loading...</div>;
  }

  const containerStyle = css({
    maxWidth: '100vw',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (min-width: 600px)': {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  const detailBlockStyle = css({
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media screen and (min-width: 600px)': {
      marginLeft: '20px', 
    },
  });

  return (
    <>
    <HeadingXXLarge marginBottom="20px" $style={{ textAlign: 'center' }}>
        {insect.nom_commun}
    </HeadingXXLarge>
    <div className={containerStyle}>
      <img src={insect.photo || "https://via.placeholder.com/400"} alt="Insect" className={css({ width: '100%', height: 'auto', maxWidth: '400px' })} />

      <div className={detailBlockStyle}>
        <Block display="flex" justifyContent="space-between" marginBottom="10px">
          <Check size={32} />
          <ParagraphLarge marginLeft="10px">{insect.nom_scientifique}</ParagraphLarge>
        </Block>
        <Block display="flex" justifyContent="space-between" marginBottom="10px">
          <Delete size={32} />
          <ParagraphLarge marginLeft="10px">{insect.famille || 'N/A'}</ParagraphLarge>
        </Block>
        <Block display="flex" justifyContent="space-between" marginBottom="10px">
          <Overflow size={32} />
          <ParagraphLarge marginLeft="10px">{insect.taille}</ParagraphLarge>
        </Block>
        <Block display="flex" justifyContent="space-between" marginBottom="10px">
          <TriangleUp size={32} />
          <ParagraphLarge marginLeft="10px">{`${insect.poids} kg`}</ParagraphLarge>
        </Block>
        <Button onClick={() => navigate(-1)} $style={{ width: '100%', marginTop: '20px' }}>
          Back
        </Button>
      </div>
    </div>
    </>
  );
};

export default Insect;
