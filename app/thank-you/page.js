'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const tabs = [
  {
    label: 'What Happens Next',
    videos: [
      { id: '1166205229', hash: '6ed19fb107', title: 'How The Process Works' },
      { id: '1166205171', hash: '87167eab08', title: 'Offer Next Steps' },
      { id: '1166205222', hash: '0fde5974c9', title: 'How Fast Can You Sell Your Home' },
      { id: '1166205283', hash: '8e4e75fe89', title: 'Will We Visit Your House' },
      { id: '1166205103', hash: 'b7e8789c5b', title: 'Set Your Own Closing Date' },
      { id: '1166205240', hash: '2862003ee8', title: 'Closing Process Overview' },
      { id: '1166205267', hash: 'b2665e98bf', title: 'Get Cash Before Closing' },
    ],
  },
  {
    label: 'Your Options',
    videos: [
      { id: '1166205308', hash: 'c0ee047324', title: 'Cash Offer vs. House Listing: Which Is Right for You?' },
      { id: '1166205290', hash: 'd104cb8412', title: 'Do I Need A Realtor?' },
      { id: '1166205114', hash: 'bcc7cb5f4f', title: "Shouldn't I Have A Realtor?" },
      { id: '1166205253', hash: '4874f820db', title: 'How We Differ From iBuyers' },
      { id: '1166205196', hash: '0912c2a80b', title: 'How to Compare Cash Offers' },
    ],
  },
  {
    label: 'Trust & Protection',
    videos: [
      { id: '1166205210', hash: 'c6506ba9a3', title: 'How to Avoid Being Scammed (Part 1)' },
      { id: '1166205216', hash: '2135a4fd9b', title: 'How to Avoid Being Scammed (Part 2)' },
      { id: '1166205159', hash: 'c7b84dacbd', title: "It's Your House, So It's Personal" },
      { id: '1166205276', hash: 'e2b075bf0c', title: 'Escaping Financial Distress' },
    ],
  },
  {
    label: 'Your Situation',
    videos: [
      { id: '1166205141', hash: '435bd115b6', title: 'Selling a Pre-Foreclosure Home' },
      { id: '1166205092', hash: 'af7f87d5d0', title: 'Selling Your House After Divorce' },
      { id: '1166205321', hash: '150a5d2455', title: 'Can You Sell a House With a Lien?' },
      { id: '1166205135', hash: '2d447a7dba', title: 'Selling a Rental Property With Tenants' },
      { id: '1166205298', hash: '13ff07cb98', title: 'Do You Need to Evict Tenants Before Selling?' },
      { id: '1166205186', hash: 'f491d06330', title: 'How to Sell a House With Fire Damage' },
      { id: '1166205121', hash: 'be0a3e3a17', title: "Selling a Loved One's Home" },
      { id: '1166205154', hash: '952ae2ea5a', title: 'Need to Relocate Quickly?' },
      { id: '1166205181', hash: '3c87ac1e03', title: 'How We Help With Moving' },
    ],
  },
];

export default function ThankYouPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(tabs[0].videos[0]);
  const [activeVideoKey, setActiveVideoKey] = useState('0-0');
  const playerRef = useRef(null);

  useEffect(() => {
    try {
      if (window.fbq) window.fbq('track', 'Lead');
    } catch (e) { /* */ }
  }, []);

  function loadVideo(tabIdx, vidIdx) {
    const video = tabs[tabIdx].videos[vidIdx];
    setCurrentVideo(video);
    setActiveVideoKey(`${tabIdx}-${vidIdx}`);
    if (playerRef.current) {
      playerRef.current.src = `https://player.vimeo.com/video/${video.id}?h=${video.hash}&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`;
    }
  }

  return (
    <div className={styles.pageWrap}>
      {/* Confirmation Card */}
      <div className={styles.confirmCard}>
        <div className={styles.checkIcon}>&#10003;</div>
        <h1>We&apos;re On It! Your Cash Offer is Coming Within 24 Hours.</h1>
        <p className={styles.lead}>Brad&apos;s team at Express Homebuyers has received your information and is reviewing your property now.</p>
        <div className={styles.nextSteps}>
          <h3>What Happens Next:</h3>
          <ul>
            <li>We&apos;ll review comparable sales in your area</li>
            <li>We&apos;ll prepare a REAL cash offer. No bait-and-switch</li>
            <li>You&apos;ll receive our offer within 24 hours via email and phone</li>
            <li>Our number won&apos;t change after &quot;inspection.&quot; We mean what we say</li>
          </ul>
        </div>
        <p className={styles.phoneCta}>Questions? Call us at <a href="tel:8882984807">(888) 298-4807</a> &nbsp;|&nbsp; Express Homebuyers &#8226; Serving DC, MD &amp; VA since 2003</p>
      </div>

      {/* Video Section */}
      <div className={styles.videoCard} id="playerSection">
        <div className={styles.videoHeader}>
          <h2>While You Wait, Watch These Short Videos</h2>
          <p>Learn exactly what to expect and get answers to the most common questions</p>
        </div>

        <div className={styles.videoLayout}>
          <div className={styles.playerSide}>
            <div className={styles.playerWrap}>
              <iframe
                ref={playerRef}
                src={`https://player.vimeo.com/video/${currentVideo.id}?h=${currentVideo.hash}&badge=0&autopause=0&player_id=0&app_id=58479`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                title={currentVideo.title}
              />
            </div>
            <p className={styles.nowPlaying}>&#9654; Now Playing: <strong>{currentVideo.title}</strong></p>
          </div>

          <div className={styles.playlistSide}>
            <div className={styles.tabs}>
              {tabs.map((tab, i) => (
                <button key={i} className={`${styles.tabBtn} ${activeTab === i ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab(i)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.videoList}>
              {tabs[activeTab].videos.map((video, vidIdx) => {
                const key = `${activeTab}-${vidIdx}`;
                return (
                  <div key={key} className={`${styles.vlistItem} ${activeVideoKey === key ? styles.vlistItemActive : ''}`} onClick={() => loadVideo(activeTab, vidIdx)}>
                    <span className={styles.vnum}>{vidIdx + 1}</span>
                    <div className={styles.playIcon}>&#9654;</div>
                    <span className={styles.vtitle}>{video.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
