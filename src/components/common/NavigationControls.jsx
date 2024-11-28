import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import VerTutorialBtn from './VerTutorialBtn';
import HelpButton from './HelpButton';

const NavigationControls = ({ setShowTutorial, tutorialKey,hidenItem=false }) => {
  return (
    <div className='p-4 pb-0' style={{display:'flex'}}>
      {!hidenItem && (
      <LinkContainer to="/inicio" className='Volver'>
        <Button>Volver a opciones</Button>
      </LinkContainer>
      )}
      <VerTutorialBtn setShowTutorial={setShowTutorial} tutorialKey={tutorialKey} />
      <HelpButton/>
    </div>
  );
};

export default NavigationControls;