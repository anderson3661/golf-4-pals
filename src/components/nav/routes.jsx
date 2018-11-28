// import React, { lazy, Suspense } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// const OrderOfMerit = Loadable({ loader: () => import('../stats-order-of-merit/order-of-merit'), loading: Loading });     // This uses Loadable from react-loadable


// Comment out if using lazy loading of components
import Home from '../home/home';

import OrderOfMerit from '../stats-order-of-merit/order-of-merit';
import NearestThePins from '../stats-nearest-the-pins/nearest-the-pins';
import ScoresByHole from '../stats-scores-by-hole/scores-by-hole';
import ScoresByCourse from '../stats-scores-by-course/scores-by-course';
import CoursesSummary from '../stats-courses-summary/courses-summary';
import Scorecard from '../stats-scorecard/scorecard';
import StoryOfTheSeason from '../story-of-the-season/story-of-the-season';
import PlayerProfiles from '../player-profiles/player-profiles';
import PlayerProfile from '../player-profile/player-profile';
import AdminCourseCRUD from '../admin-course-crud/admin-course-crud';
import AdminRoundCRUD from '../admin-round-crud/admin-round-crud';
import Admin from '../admin/admin';
import Help from '../help/help';
import Contact from '../contact/contact';
import About from '../about/about';
// import Test from '../test/test';


// Comment out if NOT using lazy loading of components

// function Loading() { return <CircularIndeterminate /> };

// const OrderOfMerit = lazy(() => import('../stats-order-of-merit/order-of-merit'));
// const NearestThePins = lazy(() => import('../stats-nearest-the-pins/nearest-the-pins'));
// const ScoresByHole = lazy(() => import('../stats-scores-by-hole/scores-by-hole'));
// const ScoresByCourse = lazy(() => import('../stats-scores-by-course/scores-by-course'));
// const CoursesSummary = lazy(() => import('../stats-courses-summary/courses-summary'));
// const Scorecard = lazy(() => import('../stats-scorecard/scorecard'));
// const StoryOfTheSeason = lazy(() => import('../story-of-the-season/story-of-the-season'));
// const PlayerProfiles = lazy(() => import('../player-profiles/player-profiles'));
// const PlayerProfile = lazy(() => import('../player-profile/player-profile'));
// const AdminCourseCRUD = lazy(() => import('../admin-course-crud/admin-course-crud'));
// const AdminRoundCRUD = lazy(() => import('../admin-round-crud/admin-round-crud'));
// const Admin = lazy(() => import('../admin/admin'));
// const Help = lazy(() => import('../help'));
// const Contact = lazy(() => import('../contact'));
// const About = lazy(() => import('../about'));
// const Test = lazy(() => import('../test/test'));


const Routes = (props) => {
    return (
        <Switch>
            {/* <Route exact path="/oom" component={OrderOfMerit} /> */}

            <Route path="/home" render={(props) => <Home {...props} />} />

            {/* Comment out if using lazy loading of components */}
            <Route exact path="/oom" component={OrderOfMerit} />
            <Route path="/oom/:yearOfCompetition" render={(props) => <OrderOfMerit {...props} />} />
            <Route path="/ntps" component={NearestThePins} />
            <Route path="/sbh" component={ScoresByHole} />
            <Route path="/sots" component={StoryOfTheSeason} />
            <Route exact path="/sbc" component={ScoresByCourse} />
            <Route path="/sbc/:courseName" render={(props) => <ScoresByCourse {...props} />} />
            <Route path="/coursessummary" component={CoursesSummary} />
            <Route path="/scorecard/:yearOfCompetition/:roundNumber" render={(props) => <Scorecard {...props} />} />
            <Route path="/playerprofiles" render={(props) => <PlayerProfiles />} />
            <Route path="/playerprofile/:playerNumber" render={(props) => <PlayerProfile {...props} />} />
            <Route path="/newcourse" render={(props) => <AdminCourseCRUD isCreate={true} appData={props.appData} />} />
            <Route path="/editcourse" render={(props) => <AdminCourseCRUD isUpdate={true} appData={props.appData} />} />
            <Route path="/deletecourse" render={(props) => <AdminCourseCRUD isDelete={true} appData={props.appData} />} />
            <Route path="/newround" render={(props) => <AdminRoundCRUD isCreate={true} appData={props.appData} />} />
            <Route path="/editround" render={(props) => <AdminRoundCRUD isUpdate={true} appData={props.appData} />} />
            <Route path="/deleteround" render={(props) => <AdminRoundCRUD isDelete={true} appData={props.appData} />} />
            <Route path="/admin" component={Admin} />
            <Route path="/help" component={Help} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            {/* <Route path="/test" render={(props) => <Test {...props} />} /> */}
            <Route path="*" render={(props) => <Home {...props} />} />

            {/* Comment out if NOT using lazy loading of components */}
            {/* <Route exact path="/oom" render={() => <Suspense fallback={Loading()}><OrderOfMerit /></Suspense>} />
            <Route path="/oom/:yearOfCompetition" render={(props) => <Suspense fallback={Loading()}><OrderOfMerit {...props} /></Suspense>} />
            <Route path="/ntps" render={() => <Suspense fallback={Loading()}><NearestThePins /></Suspense>} />
            <Route path="/sbh" render={() => <Suspense fallback={Loading()}><ScoresByHole /></Suspense>} />
            <Route path="/sots" render={() => <Suspense fallback={Loading()}><StoryOfTheSeason /></Suspense>} />
            <Route exact path="/sbc" render={() => <Suspense fallback={Loading()}><ScoresByCourse /></Suspense>} />
            <Route path="/sbc/:courseName" render={(props) => <Suspense fallback={Loading()}><ScoresByCourse {...props} /></Suspense>} />
            <Route path="/coursessummary" render={() => <Suspense fallback={Loading()}><CoursesSummary /></Suspense>} />
            <Route path="/scorecard/:yearOfCompetition/:roundNumber" render={(props) => <Suspense fallback={Loading()}><Scorecard {...props} /></Suspense>} />
            <Route path="/playerprofiles" render={() => <Suspense fallback={Loading()}><PlayerProfiles /></Suspense>} />
            <Route path="/playerprofile/:playerNumber" render={(props) => <Suspense fallback={Loading()}><PlayerProfiles {...props} /></Suspense>} />
            <Route path="/newcourse" render={(props) => <Suspense fallback={Loading()}><AdminCourseCRUD isCreate={true} appData={props.appData} /></Suspense>} />
            <Route path="/editcourse" render={(props) => <Suspense fallback={Loading()}><AdminCourseCRUD isUpdate={true} appData={props.appData} /></Suspense>} />
            <Route path="/deletecourse" render={(props) => <Suspense fallback={Loading()}><AdminCourseCRUD isDelete={true} appData={props.appData} /></Suspense>} />
            <Route path="/newround" render={(props) => <Suspense fallback={Loading()}><AdminRoundCRUD isCreate={true} appData={props.appData} /></Suspense>} />
            <Route path="/editround" render={(props) => <Suspense fallback={Loading()}><AdminRoundCRUD isUpdate={true} appData={props.appData} /></Suspense>} />
            <Route path="/deleteround" render={(props) => <Suspense fallback={Loading()}><AdminRoundCRUD isDelete={true} appData={props.appData} /></Suspense>} />
            <Route path="/admin" render={() => <Suspense fallback={Loading()}><Admin /></Suspense>} />
            <Route path="/help" render={() => <Suspense fallback={Loading()}><Help /></Suspense>} />
            <Route path="/contact" render={() => <Suspense fallback={Loading()}><Contact /></Suspense>} />
            <Route path="/about" render={() => <Suspense fallback={Loading()}><About /></Suspense>} />
            <Route path="/test" render={(props) => <Suspense fallback={Loading()}><Test {...props} /></Suspense>} />
            <Route path="*" render={(props) => <Home {...props} />} /> */}

        </Switch>
    );
};

export default Routes;