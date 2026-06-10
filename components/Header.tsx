"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
        <div className="header-wrapper rn-popup-mobile-menu m--0 row align-items-center">
          <div className="col-lg-2 col-6">
            <div className="header-left">
              <div className="logo">
                <a href="/">
                  <Image src="/assets/images/logo-dark.png" alt="logo" width={120} height={40} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-6">
            <div className="header-center">
              <nav id="sideNav" className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav">
                <ul className="primary-menu nav nav-pills">
                  <li className="nav-item current"><a className="nav-link" href="/#home">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/#features">Features</a></li>
                  <li className="nav-item"><Link className="nav-link" href="/#portfolio">Portfolio</Link></li>
                  <li className="nav-item"><a className="nav-link" href="/#resume">Resume</a></li>
                  <li className="nav-item"><a className="nav-link" href="/#contacts">Contact</a></li>
                </ul>
              </nav>
              <div className="header-right">
                <a href="javascript:void(0)" className="quote-btn rn-btn" data-bs-toggle="modal" data-bs-target="#quoteModal">
                  <span>Get a Quote</span>
                </a>
                <div className="hamberger-menu d-block d-xl-none">
                  <i id="menuBtn" className="feather-menu humberger-menu"></i>
                </div>
                <div className="close-menu d-block">
                  <span className="closeTrigger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="menu-top">
            <div className="menu-header">
              <a className="logo" href="">
                <Image src="/assets/images/logos-circle.png" alt="Personal Portfolio" width={60} height={60} />
              </a>
              <div className="close-button">
                <button className="close-menu-activation close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <p className="discription">Ashish Sharma - Personal Portfolio</p>
          </div>
          <div className="content">
            <ul className="primary-menu nav nav-pills onepagenav">
              <li className="nav-item current"><a className="nav-link smoth-animation active" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link smoth-animation" href="#features">Features</a></li>
              <li className="nav-item"><Link className="nav-link smoth-animation" href="/portfolio">Portfolio</Link></li>
              <li className="nav-item"><a className="nav-link smoth-animation" href="#resume">Resume</a></li>
              <li className="nav-item"><a className="nav-link smoth-animation" href="#contacts">Contact</a></li>
              <li className="nav-item"><a href="javascript:void(0)" className="nav-link" data-bs-toggle="modal" data-bs-target="#quoteModal">Get a Quote</a></li>
            </ul>
            <div className="social-share-style-1 mt--40">
              <span className="title">find with me</span>
              <ul className="social-share d-flex liststyle">
                <li className="facebook"><a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a></li>
                <li className="instagram"><a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></li>
                <li className="linkedin"><a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
