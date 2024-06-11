import React from 'react';
import useConWiner from '../../../hooks/useConWiner';
import useAuth from '../../../hooks/useAuth';

const MyWinings = () => {
    const { user } = useAuth()
    const [contestWiner] = useConWiner()
    console.log(contestWiner);
    const myWining = contestWiner.filter(win => win.perticipantUserEmail === user?.email)
    console.log(myWining);
    return (
        <div>

        </div>
    );
};

export default MyWinings;