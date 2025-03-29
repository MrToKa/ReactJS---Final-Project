import React from 'react';

const CreateInstrumentButton = () => {
    const handleCreate = () => {
        console.log('Create Instrument button clicked');
        // Add logic to create a new instrument
    };

    return <button onClick={handleCreate}>Create Instrument</button>;
};

export default CreateInstrumentButton;
