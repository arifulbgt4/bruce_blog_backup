/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import MenueItems from './MenueItems';
import { Div, SmallScreenAuthInfo } from './style';
import AuthInfo from '../components/utilities/auth-info/info';
import {
  changeRtlMode,
  changeLayoutMode,
  changeMenuMode,
} from '../redux/themeLayout/actionCreator';

const { darkTheme } = require('../config/theme/themeVariables');

const { Header, Sider } = Layout;

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
        searchHide: true,
        activeSearch: false,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed, hide, searchHide, activeSearch } = this.state;
      const {
        ChangeLayoutMode,
        rtl,
        changeRtl,
        changeLayout,
        topMenu,
        changeMenuMode,
      } = this.props;

      const left = !rtl ? 'left' : 'right';
      const darkMode = ChangeLayoutMode;
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
          searchHide: true,
        });
      };

      const toggleSearch = () => {
        this.setState({
          activeSearch: !activeSearch,
        });
      };

      const handleSearchHide = (e) => {
        e.preventDefault();
        this.setState({
          searchHide: !searchHide,
          hide: true,
        });
      };

      const footerStyle = {
        padding: '20px 30px 18px',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '14px',
        background: 'rgba(255, 255, 255, .90)',
        width: '100%',
        boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
      };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: '15px 15px 55px 15px',
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 998,
      };

      const renderView = ({ style, ...props }) => {
        const customStyle = {
          marginRight: 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div {...props} style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
          [left]: '2px',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '2px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div style={thumbStyle} />;
      };

      const renderThumbHorizontal = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const onRtlChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'rtl');
        changeRtl(true);
      };

      const onLtrChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'ltr');
        changeRtl(false);
      };

      const modeChangeDark = () => {
        changeLayout(true);
      };

      const modeChangeLight = () => {
        changeLayout(false);
      };

      const modeChangeTopNav = () => {
        changeMenuMode(true);
      };

      const modeChangeSideNav = () => {
        changeMenuMode(false);
      };

      const onEventChange = {
        onRtlChange,
        onLtrChange,
        modeChangeDark,
        modeChangeLight,
        modeChangeTopNav,
        modeChangeSideNav,
      };

      return (
        <Div darkMode={darkMode}>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
            >
              <Row>
                <Col
                  lg={!topMenu ? 4 : 3}
                  sm={6}
                  xs={12}
                  className="align-center-v navbar-brand"
                >
                  {!topMenu || window.innerWidth <= 991 ? (
                    <Button type="link" onClick={toggleCollapsed}>
                      <img
                        src={require(`../static/img/icon/${
                          collapsed ? 'right.svg' : 'left.svg'
                        }`)}
                        alt="menu"
                      />
                    </Button>
                  ) : null}
                  <Link
                    className={
                      topMenu && window.innerWidth > 991
                        ? 'striking-logo top-menu'
                        : 'striking-logo'
                    }
                    to="/admin"
                  >
                    <img
                      src={
                        !darkMode
                          ? require(`../static/img/logo.png`)
                          : require(`../static/img/logo.png`)
                      }
                      alt=""
                    />
                  </Link>
                </Col>

                <Col lg={14} md={8} sm={0} xs={0}></Col>

                <Col lg={6} md={10} sm={0} xs={0}>
                  <AuthInfo />
                </Col>

                <Col md={0} sm={18} xs={12}>
                  <>
                    <div className="mobile-action">
                      <Link
                        className="btn-search"
                        onClick={handleSearchHide}
                        to="#"
                      >
                        {searchHide ? (
                          <FeatherIcon icon="search" />
                        ) : (
                          <FeatherIcon icon="x" />
                        )}
                      </Link>
                      <Link className="btn-auth" onClick={onShowHide} to="#">
                        <FeatherIcon icon="more-vertical" />
                      </Link>
                    </div>
                  </>
                </Col>
              </Row>
            </Header>
            <div className="header-more">
              <Row>
                <Col md={0} sm={24} xs={24}>
                  <div className="small-screen-headerRight">
                    <SmallScreenAuthInfo hide={hide} darkMode={darkMode}>
                      <AuthInfo rtl={rtl} />
                    </SmallScreenAuthInfo>
                  </div>
                </Col>
              </Row>
            </div>
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={darkTheme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={!darkMode ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <MenueItems
                        topMenu={topMenu}
                        rtl={rtl}
                        toggleCollapsed={toggleCollapsedMobile}
                        darkMode={darkMode}
                        events={onEventChange}
                      />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <WrappedComponent {...this.props} />
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      ChangeLayoutMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  const mapStateToDispatch = (dispatch) => {
    return {
      changeRtl: (rtl) => dispatch(changeRtlMode(rtl)),
      changeLayout: (show) => dispatch(changeLayoutMode(show)),
      changeMenuMode: (show) => dispatch(changeMenuMode(show)),
    };
  };

  LayoutComponent.propTypes = {
    ChangeLayoutMode: propTypes.bool,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
    changeRtl: propTypes.func,
    changeLayout: propTypes.func,
    changeMenuMode: propTypes.func,
  };

  return connect(mapStateToProps, mapStateToDispatch)(LayoutComponent);
};
export default ThemeLayout;
