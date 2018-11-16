import React from 'react';
import './help.css';

const Help = () => {

    return (

        <div className="stats-outer">

            <div className="container-main-content-help">

                <div className="container-card">

                    <header>
                        <h1>Help</h1>
                    </header>

                    <div className="accordion">
                        <div className="accordion__item">
                            <a href="#tab1" className="accordion__trigger accordion__title">How to add a new course</a>
                            <div id="tab1" className="accordion__content">
                                <p>Click on <span>Administration</span> in the main menu.</p>
                                <p>Click on <span>New Course</span>.</p>
                                <p>Complete the New Course form and then click on <span>Save Changes</span>.</p>
                                <p><span>Editing</span> or <span>Deleting</span> a course follows a similar pattern.</p>
                            </div>                        
                        </div>
                    </div>

                    <div className="accordion">
                        <div className="accordion__item">
                            <a href="#tab2" className="accordion__trigger accordion__title">How to add a new round</a>
                            <div id="tab2" className="accordion__content">
                                <p>Click on <span>Administration</span> in the main menu.</p>
                                <p>Click on <span>New Round</span>.</p>
                                <p>Complete the New Round form and then click on <span>Save Changes</span>.</p>
                                <p><span>Editing</span> or <span>Deleting</span> a round follows a similar pattern.</p>
                            </div>                        
                        </div>
                    </div>

                    <div className="accordion">
                        <div className="accordion__item">
                            <a href="#tab3" className="accordion__trigger accordion__title">How to reset the app</a>
                            <div id="tab3" className="accordion__content">
                            <p>Click on <span>Administration</span> in the main menu.</p>
                            <p>Click on <span>Reset App</span>.</p>
                            <p>This will remove any data after 6th November 2010 (i.e. after the 6th round of the 2010 Order of Merit).</p>
                            </div>                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
 
export default Help;