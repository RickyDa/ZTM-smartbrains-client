import React from 'react'

const Rank = ({ user }) => {
    const { name, entries } = user
    return (
        <div>
            <div className='white f3'>
                <p> {`Hi ${name}, your current number of entries is...`} </p>
            </div>
            <div className='white f1'>
                <p> {`${entries}`} </p>
            </div>
        </div>
    );
}

export default Rank;