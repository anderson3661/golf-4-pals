import React from 'react';


class ScrollToTopOfPage extends React.Component {

    state = { intervalId: 0 }
    
    scrollStep() {
      if (window.pageYOffset === 0) {
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
    
    render () {
        return <button className="buttonScrollToTopOfPage" onClick={ () => { this.scrollToTop(); }}>
                    {/* <img src={require(`../../assets/images/miscellaneous/flagInHole.png`)} alt=""></img> */}
                    <span>Top</span>
                </button>;
     }
}

export default ScrollToTopOfPage;