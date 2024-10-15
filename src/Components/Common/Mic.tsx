const Mic = () => {
  return (
    <>
      <div className="content">
        <div className="button-container">
          <input type="checkbox" id="micButton" className="mic-checkbox" />
          <label htmlFor="micButton" className="mic-button">
            <div className="mic">
              <div className="mic-button-loader"></div>
              <div className="mic-base"></div>
            </div>
            <div className="button-message">
              <span>PRESS TO TALK</span>
            </div>
          </label>
        </div>
      </div>
      <div className="credits">Designed and Coded with fun by me.</div>
    </>
  );
};

export default Mic;
