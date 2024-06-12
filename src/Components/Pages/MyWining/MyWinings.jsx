import React from 'react';
import useConWiner from '../../../hooks/useConWiner';
import useAuth from '../../../hooks/useAuth';
import MyWiningCard from './MyWiningCard';

const MyWinings = () => {
    const { user } = useAuth()
    const [contestWiner] = useConWiner()
    console.log(contestWiner);
    const myWining = contestWiner.filter(win => win.perticipantUserEmail === user?.email)
    console.log(myWining);
    return (
        <div>
            {
                myWining.map((myWin,idx) => <MyWiningCard key={idx} myWin={myWin}></MyWiningCard>)
            }
        </div>
    );
};

export default MyWinings;