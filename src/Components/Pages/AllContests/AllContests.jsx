import React from 'react';
import useContest from '../../../hooks/useContest';
import AllContestCard from './AllContestCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AllContests = () => {
    const [contest] = useContest()
    console.log(contest,'uuuuuuuuuuu');
    const accepContest = contest.filter(c => c.status === 'accept')
    console.log(accepContest,'mmmmmmmmmmmm');
    const marketing = accepContest.filter(acpt => acpt.contestTag === 'Marketing Strategy')
    const business = accepContest.filter(acpt => acpt.contestTag === 'Business Idea Concerts')
    const gaming = accepContest.filter(acpt => acpt.contestTag === 'Gaming Review')
    const movie = accepContest.filter(acpt => acpt.contestTag === 'Movie Review')
    const digital = accepContest.filter(acpt => acpt.contestTag === 'Digital advertisement')
    const image = accepContest.filter(acpt => acpt.contestTag === 'Image Design')
    const article = accepContest.filter(acpt => acpt.contestTag === 'Article Writing')
    console.log(marketing);
    return (
        <div className='mt-28 mx-5'>
            <Tabs>
                <TabList>
                    <Tab>Marketing Strategy</Tab>
                    <Tab>Business Idea Concerts</Tab>
                    <Tab>Gaming Review</Tab>
                    <Tab>Movie Review</Tab>
                    <Tab>Digital advertisement</Tab>
                    <Tab>Article Writing</Tab>
                    <Tab>Image Design</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            marketing.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            business.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            gaming.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            movie.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            digital.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            article.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            image.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
            {/* <div className='grid grid-cols-3 gap-5'>
                {
                    marketing.map((contests, idx) => <AllContestCard contests={contests} key={idx}></AllContestCard>)
                }
            </div> */}
        </div>
    );
};

export default AllContests;