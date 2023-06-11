import React from 'react';

const Rank = ({name, userEntryCount}) => {
    return (
        <div>
            <div className='white f3'>
                {name + ', your current rank is...'}
            </div>
            <div className='white f1'>
                {userEntryCount}
            </div>
        </div>

    );
}

export default Rank;
