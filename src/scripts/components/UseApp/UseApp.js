import React from 'react';


export default class UseApp extends React.Component {
  render() {
    return (
      <div id="mobile-container">
        <div className="row text-center">
          <img src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/signin/logo.png" style={{margin: '0 auto', display: 'block', width: '120px'}} />
        </div>
        <div className="row text-center">
          <h3 className="noto margin-top50">모바일로 이용하고 싶으세요?</h3>
          <h3 className="noto" style={{ marginTop: '15px' }}>더욱 편리한 파피루스 앱을 설치해보세요.</h3>
        </div>
        <div className="row text-center margin-top50">
          <a href="https://play.google.com/store/apps/details?id=com.papyruth.android" target="_blank">
            <img className="applink-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/applink/google-store-button.png" style={{ marginRight: '10px', width: '135px' }} />
          </a>
          <a href="https://appsto.re/kr/bG3k_.i" target="_blank">
            <img className="applink-img" src="//d2pqv3srin2mqf.cloudfront.net/web_resources/images/applink/apple-store-button.png" style={{ width: '135px' }} />
          </a>
        </div>
        <div className="row margin-top50">
          <p className="text-center roboto" style={{fontSize: '14px'}}>
            &copy;&nbsp;Team Montserrat
            <br />
            <a href="mailto:contact@papyruth.com" target="_top">contact@papyruth.com</a>
          </p>
        </div>
      </div>
    );
  }
};
