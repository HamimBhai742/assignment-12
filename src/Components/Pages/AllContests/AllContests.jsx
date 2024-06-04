import React from 'react';
import useContest from '../../../hooks/useContest';
import AllContestCard from './AllContestCard';

const AllContests = () => {
    const [contest] = useContest()
    console.log(contest);
    const accepContest = contest.filter(c => c.status === 'accept')
    console.log(accepContest);
    return (
        <div className='mt-28 mx-5'>
            <div className='grid grid-cols-3 gap-5'>
                {
                    accepContest.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                }
            </div>
        </div>
    );
};

export default AllContests;